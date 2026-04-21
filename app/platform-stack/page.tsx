import Image from "next/image";
import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";

export default function PlatformStackPage() {
  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Platform Stack"
        title="Phone App Preview"
        description="A visual preview of the mobile app experience connected to the wider Precision Performance platform."
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#11211a] shadow-panel">
          <Image
            src="/phone app.jpg"
            alt="Precision Performance phone app preview"
            width={1200}
            height={1600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white"
          >
            Return to front page
          </Link>
        </div>
      </SectionCard>
    </main>
  );
}
