import AddProjectForm from "@/components/AddProjectForm";
import { getPlatforms, getSeries } from "@/lib/data";
import { PageProps } from "@/lib/server.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const supabase = createServerComponentClient({ cookies });
  const seriesList = await getSeries({ supabase });
  const platforms = await getPlatforms({ supabase });

  return (
    <div className="max-w-xl">
      <AddProjectForm platforms={platforms} seriesList={seriesList} />
    </div>
  );
}
