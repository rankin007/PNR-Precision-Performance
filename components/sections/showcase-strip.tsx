import Image from "next/image";
import Link from "next/link";

type ShowcaseStripProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href: string;
  ctaLabel: string;
  reverse?: boolean;
};

export function ShowcaseStrip({
  id,
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  ctaLabel,
  reverse = false,
}: ShowcaseStripProps) {
  return (
    <section id={id} className="px-4 py-8 md:px-8 md:py-14">
      <div className="section-wrap">
        <div className="rounded-[2rem] border border-ink/10 bg-white/90 p-6 shadow-panel md:p-8">
          <div className={`grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">{title}</h2>
              <p className="mt-4 max-w-2xl text-[14pt] leading-8 text-steel">{description}</p>
              <div className="mt-6">
                <Link
                  href={href}
                  className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f1720]"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>

            {imageSrc ? (
              <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#11211a] shadow-panel">
                <Image
                  src={imageSrc}
                  alt={imageAlt ?? title}
                  width={1600}
                  height={1200}
                  className="h-auto w-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-ink/10 bg-sand p-8">
                <p className="text-[14pt] leading-8 text-steel">
                  Use this section as the next step into the connected Precision Performance member and commerce
                  experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
