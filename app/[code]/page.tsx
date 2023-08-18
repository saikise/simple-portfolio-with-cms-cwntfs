import { SERIES_LIST, projects } from "@/constants/data";
import { PageProps } from "@/lib/server.types";
import { notFound } from "next/navigation";
import ProjectRow from "../../components/ProjectRow";

export default async function Page({ params }: PageProps) {
  const series = SERIES_LIST.find((s) => s.code === params.code);
  const filteredProjects = projects.filter(
    (project) => project.series.code === params.code,
  );

  if (!series) {
    notFound();
  }

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
              <ProjectRow {...project} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
