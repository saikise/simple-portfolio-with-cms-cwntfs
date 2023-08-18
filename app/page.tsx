import { SERIES_LIST, projects } from "@/constants/data";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";

export default async function Page() {
  const pinned = projects.filter((project) => project.pinned).slice(0, 4);
  const projectsPerSeries = SERIES_LIST.map((series) => {
    return projects.filter((project) => project.series.code === series.code);
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-w-xl flex-col gap-2">
        <h4 className="text-2xl font-bold text-white">
          Demo of simple-portfolio-cwntf
        </h4>

        <h3 className="text-xl font-bold text-white underline">
          <Link
            target="_blank"
            rel="noopener"
            href="https://medium.com/@saikise/code-crafts-simple-portfolio-cwntf-88b6e48a50e3"
          >
            🧱 Tutorial on Medium
          </Link>
        </h3>
        <i className="text-sm font-normal text-gray-700 dark:text-gray-400">
          Quick project. No backend needed.
          <br />
          <b>Stack:</b> Next, Tailwind, Flowbite.
          <br />
          <b>Tags:</b> Full-stack dev, Next.js 13 app router.
          {/* https://medium.com/@saikise/code-crafts-simple-portfolio-cwntf-88b6e48a50e3 */}
        </i>
      </div>
      {!!pinned.length && (
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <h5 className="text-xl font-bold text-white">Pinned</h5>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {pinned.map((project) => (
              <div key={`project-card-${project.id}`} className="w-full">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      )}
      {projectsPerSeries.map((projects) => {
        if (!!projects.length)
          return (
            <div className="mt-2 flex flex-col gap-4">
              <div className="flex items-end justify-between">
                <div>
                  <h5 className="text-xl font-bold text-white">
                    {projects[0].series.title}
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-400">
                    {projects[0].series.description}
                  </p>
                </div>
                <Link href={projects[0].series.code}>
                  <p className="text-sm text-white hover:underline">Show all</p>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
                {projects.slice(0, 4).map((project) => (
                  <div
                    key={`project-card-${project.id}`}
                    className="w-full"
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>
          );
      })}
    </div>
  );
}
