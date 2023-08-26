import EditProjectForm from "@/components/EditProjectForm";
import {
  getPlatforms,
  getProject,
  getProjectPlatforms,
  getSeries,
} from "@/lib/data";
import { PageProps } from "@/lib/server.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const supabase = createServerComponentClient({ cookies });
  const [project, seriesList, allPlatforms, platforms] = await Promise.all([
    getProject({ supabase, id: params.id }),
    getSeries({ supabase }),
    getPlatforms({ supabase }),
    getProjectPlatforms({ supabase, projectId: params.id }),
  ]);

  const platformIds = platforms.map((platform) => platform.id);
  const platformsToAdd = allPlatforms.filter(
    (platform) => !platformIds.includes(platform.id),
  );
  const newPlatforms = [...platforms, ...platformsToAdd];
  // Sort alphabetically by title
  newPlatforms.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-xl">
      <EditProjectForm
        platforms={newPlatforms}
        project={project}
        seriesList={seriesList}
      />
    </div>
  );
}
