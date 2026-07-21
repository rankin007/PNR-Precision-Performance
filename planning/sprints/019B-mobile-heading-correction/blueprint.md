# Sprint 019B - Mobile Heading Correction Blueprint

## Intent

Close the single rendered visual defect found after Sprint 019 without reopening the core sprint or broadening design scope.

## Execution Plan

1. Read Sprint 019B authorities and confirm authorization.
2. Capture the current heading measurements and screenshot at `390 × 844`.
3. Inspect only the holding-page heading classes.
4. Choose the smallest responsive correction, preferring fluid or smaller mobile type over forced word-breaking that harms readability.
5. Do not change text, metadata, imagery, CTAs, routes, or behavior.
6. Render at `390 × 844` and verify the word fits inside its container.
7. Render at `1440 × 900` and verify the desktop composition is preserved.
8. Verify keyboard focus, mobile sign-in usability, gate redirects, and robots metadata.
9. Run static/build validation.
10. Update the visual-QA record and close Sprint 019B.

## Preferred Fix Shape

A narrow responsive typography adjustment on the existing `h1` is preferred. The implementation may use a smaller mobile size or fluid `clamp()` value while retaining the established desktop size at the `md` breakpoint.

Do not insert manual line-break markup unless responsive typography cannot satisfy acceptance cleanly. Do not use arbitrary horizontal clipping or hidden overflow to mask failure.

## Closeout

On successful acceptance:

- record Sprint 019B complete locally
- reset implementation authorization to `no`
- keep Sprint 020 as the next core sprint
- preserve the public under-construction gate
