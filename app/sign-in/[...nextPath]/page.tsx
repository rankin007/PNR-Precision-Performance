import { redirect } from "next/navigation";
import { normalizeNextPath } from "@/lib/auth/next-path";

type SignInCatchAllPageProps = {
  params: Promise<{ nextPath?: string[] }>;
};

export default async function SignInCatchAllPage({ params }: SignInCatchAllPageProps) {
  const resolvedParams = await params;
  const nextPath = normalizeNextPath(resolvedParams.nextPath?.join("/"));

  redirect(`/sign-in?next=${encodeURIComponent(nextPath)}`);
}
