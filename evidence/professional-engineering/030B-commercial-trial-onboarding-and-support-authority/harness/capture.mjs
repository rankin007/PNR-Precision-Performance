import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../../../..");
const harness = path.join(root, "evidence/professional-engineering/030B-commercial-trial-onboarding-and-support-authority/harness");
const visualDir = path.join(root, "evidence/professional-engineering/030B-commercial-trial-onboarding-and-support-authority/visuals");
const port = 3220;
const debugPort = 9322;
const baseUrl = `http://127.0.0.1:${port}`;
const nowIso = "2026-08-12T04:00:00.000Z";

const chromeCandidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  path.join(process.env.LOCALAPPDATA ?? "", "Google/Chrome/Application/chrome.exe"),
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const chrome = chromeCandidates.find((candidate) => fs.existsSync(candidate));
if (!chrome) throw new Error("No approved local Chromium executable found.");

fs.mkdirSync(visualDir, { recursive: true });
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "030b-chromium-"));
const nextBin = path.join(root, "node_modules/next/dist/bin/next");

let server;
let browser;

async function waitFor(url, attempts = 120) {
  let lastError;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw lastError ?? new Error(`Timed out waiting for ${url}`);
}

class Cdp {
  constructor(url) {
    this.socket = new WebSocket(url);
    this.sequence = 0;
    this.pending = new Map();
  }
  async open() {
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (!message.id) return;
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      if (message.error) pending.reject(new Error(message.error.message));
      else pending.resolve(message.result);
    });
  }
  send(method, params = {}) {
    const id = ++this.sequence;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  close() {
    this.socket.close();
  }
}

async function createPage(url) {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(url)}`, { method: "PUT" });
  if (!response.ok) throw new Error(`Unable to create Chromium page: ${response.status}`);
  const target = await response.json();
  const cdp = new Cdp(target.webSocketDebuggerUrl);
  await cdp.open();
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  return { cdp, targetId: target.id };
}

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

const auditExpression = (expectedSections, namedViewport) => `(() => {
  const expectedSections = ${JSON.stringify(expectedSections)};
  const namedViewport = ${JSON.stringify(namedViewport)};
  const isVisible = (element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  };
  const selectorFor = (element) => {
    if (element.id) return "#" + CSS.escape(element.id);
    const name = element.getAttribute("name");
    return element.tagName.toLowerCase() + (name ? '[name="' + name + '"]' : "");
  };
  const nonzeroClientWidths = [document.documentElement.clientWidth, document.body.clientWidth]
    .filter((width) => Number.isFinite(width) && width > 0);
  const effectiveClientViewportWidth = nonzeroClientWidths.length
    ? Math.min(...nonzeroClientWidths)
    : 0;
  const localScrollRegionFor = (element) => {
    let current = element.parentElement;
    while (current) {
      const style = getComputedStyle(current);
      if ((style.overflowX === "auto" || style.overflowX === "scroll") && current.scrollWidth > current.clientWidth) {
        const rect = current.getBoundingClientRect();
        if (rect.left >= -0.5 && rect.right <= effectiveClientViewportWidth + 0.5) return current;
      }
      current = current.parentElement;
    }
    return null;
  };
  const visibleElements = [...document.body.querySelectorAll("*")].filter(isVisible);
  const localScrollExemptions = new Map();
  const materialElements = visibleElements.filter((element) => {
    const container = localScrollRegionFor(element);
    if (!container) return true;
    localScrollExemptions.set(container, (localScrollExemptions.get(container) ?? 0) + 1);
    return false;
  });
  const intentionalLocalScrollContainers = [...localScrollExemptions.entries()].map(([container, exemptDescendantCount]) => {
    const rect = container.getBoundingClientRect();
    return {
      selector: selectorFor(container),
      overflowX: getComputedStyle(container).overflowX,
      clientWidth: container.clientWidth,
      scrollWidth: container.scrollWidth,
      left: Number(rect.left.toFixed(2)),
      right: Number(rect.right.toFixed(2)),
      exemptDescendantCount,
      boundedByEffectiveClientViewport: rect.left >= -0.5 && rect.right <= effectiveClientViewportWidth + 0.5,
    };
  });
  const overflowElements = materialElements
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return {
        selector: selectorFor(element),
        rect,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
        boxMetricsApplicable: element instanceof HTMLElement,
        intentionallyExemptLocalScroll: localScrollExemptions.has(element),
      };
    })
    .filter(({ rect, clientWidth, scrollWidth, boxMetricsApplicable, intentionallyExemptLocalScroll }) =>
      rect.left < -0.5 ||
      rect.right > effectiveClientViewportWidth + 0.5 ||
      (boxMetricsApplicable && !intentionallyExemptLocalScroll && rect.left + scrollWidth > effectiveClientViewportWidth + 0.5))
    .map(({ selector, rect, clientWidth, scrollWidth }) => ({ selector, left: rect.left, right: rect.right, width: rect.width, clientWidth, scrollWidth }));
  const maximumMaterialRightEdge = materialElements.reduce((maximum, element) => Math.max(maximum, element.getBoundingClientRect().right), 0);

  const interactiveSelector = 'a[href],button,input:not([type="hidden"]),select,textarea,[role="button"],[tabindex]:not([tabindex="-1"])';
  const targets = [...document.querySelectorAll(interactiveSelector)]
    .filter((element) => isVisible(element) && !element.disabled)
    .map((element) => {
      const own = element.getBoundingClientRect();
      const label = element.closest("label") || (element.id ? document.querySelector('label[for="' + CSS.escape(element.id) + '"]') : null);
      const labelled = label && isVisible(label) ? label.getBoundingClientRect() : own;
      const left = Math.min(own.left, labelled.left);
      const top = Math.min(own.top, labelled.top);
      const right = Math.max(own.right, labelled.right);
      const bottom = Math.max(own.bottom, labelled.bottom);
      const labelledBy = element.getAttribute("aria-labelledby");
      const accessibleName =
        element.getAttribute("aria-label") ||
        (labelledBy ? labelledBy.split(/\\s+/).map((id) => document.getElementById(id)?.textContent ?? "").join(" ").trim() : "") ||
        label?.textContent?.trim() ||
        element.textContent?.trim() ||
        element.getAttribute("title") ||
        element.getAttribute("name") ||
        "";
      const classText = element.getAttribute("class") ?? "";
        const nativeFocus = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(element.tagName) || element.hasAttribute("tabindex");
      return {
        selector: selectorFor(element),
        accessibleName,
        width: Number((right - left).toFixed(2)),
        height: Number((bottom - top).toFixed(2)),
        applicable: true,
        pass: right - left >= 44 && bottom - top >= 44,
        labelledHitArea: label !== null,
        hasFocusTreatment: nativeFocus || classText.includes("focus-visible:"),
      };
    });
  const missingLabels = targets.filter((target) => !target.accessibleName).map((target) => target.selector);
  const missingFocusTreatment = targets.filter((target) => !target.hasFocusTreatment).map((target) => target.selector);
  const below44 = targets.filter((target) => !target.pass);
  const present = expectedSections.filter((selector) => document.querySelector(selector));
  const statusElements = [...document.querySelectorAll('[role="status"],[role="alert"],[aria-live]')].filter(isVisible);
  const missingStatusSemantics = statusElements
    .filter((element) => !["status", "alert"].includes(element.getAttribute("role")) && !["polite", "assertive"].includes(element.getAttribute("aria-live")))
    .map((element) => selectorFor(element));
  const colourOnlyStates = statusElements
    .filter((element) => !(element.textContent?.trim() || element.getAttribute("aria-label") || element.getAttribute("title")))
    .map((element) => selectorFor(element));
  const missingSections = expectedSections.filter((section) => !present.includes(section));
  const result = {
    measuredAt: ${JSON.stringify(nowIso)},
    namedViewport,
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
    documentClientWidth: document.documentElement.clientWidth,
    bodyClientWidth: document.body.clientWidth,
    effectiveClientViewportWidth,
    effectiveClientViewportRule: "Smallest relevant nonzero document/body client width; the named viewport and window.innerWidth are telemetry only and never the pass boundary.",
    documentScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    maximumMaterialRightEdge: Number(maximumMaterialRightEdge.toFixed(2)),
    overflowElements,
    intentionalLocalScrollContainers,
    requiredSections: { expected: expectedSections, present, missing: missingSections },
    interactiveTargets: {
      rule: "Visible enabled interactive controls are applicable; hidden inputs are explicitly excluded. The union of a control and its effective visible label is measured as the labelled hit area. Every applicable target must be at least 44x44 CSS pixels.",
      hiddenInputsExcluded: document.querySelectorAll('input[type="hidden"]').length,
      applicableCount: targets.length,
      below44Count: below44.length,
      items: targets,
    },
    accessibility: {
      missingLabels,
      missingFocusTreatment,
      missingStatusSemantics,
      colourOnlyStates,
      statusCount: statusElements.length,
      rule: "Labels, focus treatment, status semantics and non-colour textual meaning are required.",
    },
  };
  result.pass =
    result.effectiveClientViewportWidth > 0 &&
    result.documentScrollWidth <= result.effectiveClientViewportWidth + 0.5 &&
    result.bodyScrollWidth <= result.effectiveClientViewportWidth + 0.5 &&
    result.maximumMaterialRightEdge <= result.effectiveClientViewportWidth + 0.5 &&
    result.overflowElements.length === 0 &&
    missingSections.length === 0 &&
    below44.length === 0 &&
    missingLabels.length === 0 &&
    missingFocusTreatment.length === 0 &&
    missingStatusSemantics.length === 0 &&
    colourOnlyStates.length === 0;
  result.failures = [
    ...(result.effectiveClientViewportWidth <= 0 ? ["missing-effective-client-width"] : []),
    ...(result.documentScrollWidth > result.effectiveClientViewportWidth + 0.5 || result.bodyScrollWidth > result.effectiveClientViewportWidth + 0.5 ? ["horizontal-overflow"] : []),
    ...(result.maximumMaterialRightEdge > result.effectiveClientViewportWidth + 0.5 ? ["material-boundary-overflow"] : []),
    ...(result.overflowElements.length ? ["out-of-bounds-elements"] : []),
    ...(missingSections.length ? ["missing-sections"] : []),
    ...(below44.length ? ["below-44-hit-area"] : []),
    ...(missingLabels.length ? ["missing-label"] : []),
    ...(missingFocusTreatment.length ? ["missing-focus-treatment"] : []),
    ...(missingStatusSemantics.length ? ["missing-status-semantics"] : []),
    ...(colourOnlyStates.length ? ["colour-only-state"] : []),
  ];
  return result;
})()`;

const textBasisExpression = (expectedSections) => `(() => {
  const parsePx = (value) => Number.parseFloat(value);
  const samples = ${JSON.stringify(expectedSections)}.map((selector) => {
    const element = document.querySelector(selector);
    return {
      selector,
      present: Boolean(element),
      fontSizePx: element ? parsePx(getComputedStyle(element).fontSize) : null,
    };
  });
  return {
    rootFontSizePx: parsePx(getComputedStyle(document.documentElement).fontSize),
    bodyFontSizePx: parsePx(getComputedStyle(document.body).fontSize),
    samples,
  };
})()`;

function ratio(after, before) {
  return Number((after / before).toFixed(4));
}

const captures = [
  { name: "approved-pricing-mobile", mode: "pricing", file: "01-mobile-pricing-414x896.png", expected: ['[data-evidence-section="pricing"]'] },
  { name: "disclaimer-commercial-boundary-mobile", mode: "disclaimer", file: "02-mobile-disclaimer-414x896.png", expected: ['[data-evidence-section="disclaimer"]'] },
  { name: "shop-detail-disabled-mobile", mode: "shop-detail", file: "03-mobile-shop-detail-414x896.png", expected: ['[data-evidence-section="shop"]', '[data-evidence-section="detail"]'] },
  { name: "admin-authority-history-mobile", mode: "admin", file: "04-mobile-admin-commerce-414x896.png", expected: ['[data-evidence-section="admin"]'] },
  { name: "commercial-authority-overview-desktop", mode: "desktop", file: "05-desktop-commercial-authority-1440x900.png", expected: ['[data-evidence-section="pricing"]', '[data-evidence-section="disclaimer"]', '[data-evidence-section="shop"]', '[data-evidence-section="detail"]', '[data-evidence-section="admin"]'], desktop: true },
];

const geometry = {
  sprint: "030B",
  captureCount: 5,
  renderer: "local Chromium CDP full-page capture",
  expectedRunCount: 13,
  expectedImageCount: 5,
  runs: [],
};

async function loadAtViewport(page, capture, width, height) {
  await page.cdp.send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: false,
    screenWidth: width,
    screenHeight: height,
  });
  await page.cdp.send("Page.navigate", { url: `${baseUrl}/?mode=${capture.mode}` });
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const ready = await evaluate(page.cdp, "document.readyState === 'complete' && document.fonts.status === 'loaded'");
    if (ready) break;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await new Promise((resolve) => setTimeout(resolve, 250));
}

async function runAudit(page, capture, { width, height, evidenceMode, screenshot = false, resizeText = false }) {
  await loadAtViewport(page, capture, width, height);
  let textResize = null;
  if (resizeText) {
    const before = await evaluate(page.cdp, textBasisExpression(capture.expected));
    await evaluate(page.cdp, `(() => {
      document.documentElement.style.fontSize = "200%";
      return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    })()`);
    const after = await evaluate(page.cdp, textBasisExpression(capture.expected));
    const sampleRatios = before.samples.map((sample, index) => ({
      selector: sample.selector,
      presentBefore: sample.present,
      presentAfter: after.samples[index].present,
      beforePx: sample.fontSizePx,
      afterPx: after.samples[index].fontSizePx,
      ratio: sample.fontSizePx && after.samples[index].fontSizePx
        ? ratio(after.samples[index].fontSizePx, sample.fontSizePx)
        : null,
    }));
    textResize = {
      method: "Runtime-only document root text basis set to 200%; no Product stylesheet or class override.",
      root: { beforePx: before.rootFontSizePx, afterPx: after.rootFontSizePx, ratio: ratio(after.rootFontSizePx, before.rootFontSizePx) },
      body: { beforePx: before.bodyFontSizePx, afterPx: after.bodyFontSizePx, ratio: ratio(after.bodyFontSizePx, before.bodyFontSizePx) },
      samples: sampleRatios,
    };
    textResize.pass =
      Math.abs(textResize.root.ratio - 2) <= 0.01 &&
      Math.abs(textResize.body.ratio - 2) <= 0.01 &&
      textResize.samples.every((sample) => sample.presentBefore && sample.presentAfter && Math.abs(sample.ratio - 2) <= 0.01);
  }
  const audit = await evaluate(page.cdp, auditExpression(capture.expected, { width, height }));
  const run = {
    name: `${capture.name}-${evidenceMode}`,
    mode: capture.mode,
    evidenceMode,
    scalePercent: resizeText ? 200 : 100,
    viewportCss: { width, height },
    textResize,
    ...audit,
    screenshot: null,
  };
  if (textResize && !textResize.pass) {
    run.pass = false;
    run.failures.push("text-resize-ratio");
  }
  if (screenshot) {
    const metrics = await page.cdp.send("Page.getLayoutMetrics");
    const fullHeight = Math.ceil(metrics.cssContentSize.height);
    const image = await page.cdp.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height: fullHeight, scale: 1 },
    });
    const buffer = Buffer.from(image.data, "base64");
    const output = path.join(visualDir, capture.file);
    fs.writeFileSync(output, buffer);
    run.screenshot = {
      file: capture.file,
      fullPage: true,
      width,
      height: fullHeight,
      bytes: buffer.length,
      nonblank: buffer.length > 1000,
    };
    if (!run.screenshot.nonblank) {
      run.pass = false;
      run.failures.push("blank-screenshot");
    }
  }
  geometry.runs.push(run);
  if (!run.pass) {
    fs.writeFileSync(path.join(visualDir, "geometry.json"), JSON.stringify(geometry, null, 2) + "\n");
    console.error(JSON.stringify(run, null, 2));
    throw new Error(`Geometry failed for ${run.name}: ${run.failures.join(", ")}`);
  }
}

function writeManifest() {
  const official = geometry.runs.filter((run) => run.evidenceMode === "official-full-page");
  const manifest = {
    sprint: "030B",
    source: "shared Product components with synthetic local data only",
    renderer: geometry.renderer,
    viewportNote: "Mobile PNGs are full-page captures rendered at a named 414 x 896 CSS viewport; PNG height truthfully follows complete content. Effective client width is separately audited in geometry.json.",
    captureCount: official.length,
    views: official.map((run) => ({
      file: run.screenshot.file,
      mode: run.mode,
      viewport: `${run.viewportCss.width}x${run.viewportCss.height}`,
      effectiveClientWidth: run.effectiveClientViewportWidth,
      dimensions: `${run.screenshot.width}x${run.screenshot.height}`,
      bytes: run.screenshot.bytes,
      fullPage: true,
      nonblank: run.screenshot.nonblank,
      sections: run.requiredSections.present,
    })),
    geometry: "geometry.json",
    privacy: "Synthetic data only; no real customer, order, payment, checkout, identity, email, credential, token, provider identifier or confidential record. Raw synthetic sentinel identifiers are removed by the Product projector before renderable props.",
  };
  fs.writeFileSync(path.join(visualDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
}

try {
  server = spawn(process.execPath, [nextBin, "dev", harness, "-p", String(port)], {
    cwd: root,
    stdio: ["ignore", "inherit", "inherit"],
    windowsHide: true,
  });
  await waitFor(baseUrl);
  browser = spawn(chrome, [
    "--headless=new",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "about:blank",
  ], { stdio: "ignore", windowsHide: true });
  await waitFor(`http://127.0.0.1:${debugPort}/json/version`);

  for (const capture of captures) {
    const page = await createPage("about:blank");
    try {
      const width = capture.desktop ? 1440 : 414;
      const height = capture.desktop ? 900 : 896;
      await runAudit(page, capture, { width, height, evidenceMode: "official-full-page", screenshot: true });
    } finally {
      page.cdp.close();
      await fetch(`http://127.0.0.1:${debugPort}/json/close/${page.targetId}`);
    }
  }

  fs.writeFileSync(path.join(visualDir, "geometry.json"), JSON.stringify(geometry, null, 2) + "\n");
  writeManifest();

  for (const capture of captures.filter((item) => !item.desktop)) {
    const page = await createPage("about:blank");
    try {
      await runAudit(page, capture, { width: 414, height: 896, evidenceMode: "resize-text-200-percent", resizeText: true });
    } finally {
      page.cdp.close();
      await fetch(`http://127.0.0.1:${debugPort}/json/close/${page.targetId}`);
    }
  }

  for (const capture of captures.filter((item) => !item.desktop)) {
    const page = await createPage("about:blank");
    try {
      await runAudit(page, capture, { width: 320, height: 896, evidenceMode: "reflow-320-css-pixels" });
    } finally {
      page.cdp.close();
      await fetch(`http://127.0.0.1:${debugPort}/json/close/${page.targetId}`);
    }
  }

  fs.writeFileSync(path.join(visualDir, "geometry.json"), JSON.stringify(geometry, null, 2) + "\n");
  writeManifest();
  console.log("Sprint 030B geometry and full-page captures passed: 13/13 runs, 5/5 images.");
} finally {
  if (browser && !browser.killed) browser.kill();
  if (server && !server.killed) server.kill();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  fs.rmSync(userDataDir, { recursive: true, force: true, maxRetries: 20, retryDelay: 100 });
}
