import ProjectRow from "../../components/ProjectRow";
import SearchBar from "../../components/SearchBar";
import SearchButtonGroup from "../../components/SearchButtonGroup";
import TopSearches from "../../components/TopSearches";
import { SERIES_LIST, projects } from "../../constants/data";
import { PageProps } from "../../lib/server.types";

export default async function Page({ searchParams }: PageProps) {
  const keyword = searchParams.q?.toString();
  const seriesCode = searchParams.t?.toString() || "all";
  const series = SERIES_LIST.find((s) => s.code === seriesCode);

  const filteredProjects = projects.filter((project) => {
    const keywordMatch =
      !keyword ||
      project.title.toLowerCase().includes(keyword.toLowerCase()) ||
      project.description.toLowerCase().includes(keyword.toLowerCase());
    const typeMatch =
      seriesCode === "all" || project.series.code === seriesCode;
    return keywordMatch && typeMatch;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-fit flex-col gap-2">
        <SearchBar />
        <SearchButtonGroup keyword={keyword || ""} seriesCode={seriesCode} />
      </div>
      {!searchParams.q && <TopSearches />}
      {!!searchParams.q && !!filteredProjects.length && (
        <ul className="max-w-2xl [&>*]:mt-2">
          {filteredProjects.map((project) => (
            <li key={`search-project-row-${project.id}`}>
              <ProjectRow {...project} />
            </li>
          ))}
        </ul>
      )}
      {!!searchParams.q && !filteredProjects.length && (
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {`No results found in titles and descriptions for keyword ${keyword}`}
          {!!series?.title && ` and category ${series.title}`}
        </p>
      )}
    </div>
  );
}
