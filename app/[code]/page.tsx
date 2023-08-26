import { getProjects, getSeries } from "@/lib/data";
import { PageProps } from "@/lib/server.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProjectRow from "../../components/ProjectRow";

export const dynamic = "force-dynamic";

export default async function Page({ params }: PageProps) {
  const supabase = createServerComponentClient({ cookies });
  const series = (await getSeries({ supabase, code: params.code }))[0];
  const filteredProjects = await getProjects({ supabase, code: params.code });

  if (!series) {
    notFound();
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-2">
      <div>
        <div className="group flex items-center text-base font-medium text-gray-900 dark:text-white">
          {series?.icon}
          <span className="ml-4">{series?.title}</span>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {series?.description}
        </p>
      </div>

      {!filteredProjects.length && (
        <p className="text-sm text-gray-700 dark:text-gray-400">
          No projects under {series?.title} yet
        </p>
      )}

      {!!filteredProjects.length && (
        <ul className="max-w-2xl [&>*]:mt-2">
          {filteredProjects.map((project) => (
            <li key={`project-row-${project.id}`}>
              <ProjectRow {...project} user={user} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
