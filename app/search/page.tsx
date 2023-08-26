import { ALL } from "@/constants/data";
import { kebabToTitle } from "@/lib/casing";
import { getProjects, getSeries } from "@/lib/data";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ProjectRow from "../../components/ProjectRow";
import SearchBar from "../../components/SearchBar";
import SearchButtonGroup from "../../components/SearchButtonGroup";
import TopSearches from "../../components/TopSearches";
import { PageProps } from "../../lib/server.types";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }: PageProps) {
  const supabase = createServerComponentClient({ cookies });
  const keyword = searchParams.q?.toString();
  const code = searchParams.t?.toString();
  const seriesList = await getSeries({
    supabase,
  });
  const seriesListWithAll = [ALL, ...seriesList];
  const projects = await getProjects({ supabase, keyword, code });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-fit flex-col gap-2">
        <SearchBar />
        <SearchButtonGroup
          keyword={keyword || ""}
          seriesCode={code || "all"}
          seriesList={seriesListWithAll}
        />
      </div>
      {!searchParams.q && <TopSearches />}
      {!!searchParams.q && !!projects.length && (
        <ul className="max-w-2xl [&>*]:mt-2">
          {projects.map((project) => (
            <li key={`search-project-row-${project.id}`}>
              <ProjectRow {...project} user={user} />
            </li>
          ))}
        </ul>
      )}
      {!!searchParams.q && !projects.length && (
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {`No results found in titles and descriptions for keyword ${keyword}`}
          {!!code && ` and category ${kebabToTitle(code)}`}
        </p>
      )}
    </div>
  );
}
