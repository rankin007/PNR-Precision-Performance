import Image from "next/image";
import Link from "next/link";
import { SectionCard } from "@/components/layout/section-card";

export default function MemberExperiencePage() {
  return (
    <main className="section-wrap px-4 py-16 md:px-8">
      <SectionCard
        eyebrow="Member Experience"
        title="Owners, trainers, and staff workspace"
        description="This page showcases the member-facing experience artwork and gives a direct path back to the main front page."
      >
        <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[#11211a] shadow-panel">
          <Image
            src="/member-experience.png"
            alt="Precision Performance member experience interface preview"
            width={1824}
            height={1584}
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
