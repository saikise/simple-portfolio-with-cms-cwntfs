import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BLUR_DATA_URL } from "../constants/colors";
import { ProjectCardProps } from "./ProjectCard";

export type ProjectRowProps = ProjectCardProps;

export default function ProjectRow({
  image,
  title,
  description,
  platforms,
}: ProjectRowProps) {
  return (
    <div className="flex w-full flex-row rounded-lg border border-gray-200 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="grid flex-1 grid-cols-10 items-center">
        <div className="relative col-start-1 col-end-3 aspect-square rounded-lg">
          <Image
            src={image}
            fill
            alt={`Picture of project ${title}`}
            // For some reason, object-fit is not working. So, I used the next/image's objectFit prop instead.
            object-fit="cover"
            objectFit="cover"
            className="rounded-lg p-1"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
          />
        </div>
        <div className="col-start-3 col-end-11 ml-2 flex h-full w-full flex-col justify-between gap-4 self-start p-2 leading-normal">
          <div>
            <h5 className="line-clamp-2 text-lg font-bold text-white">
              {title}
            </h5>
            <p className="mt-1 line-clamp-3 text-sm text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>

          <div className="flex flex-row gap-2">
            {platforms.length &&
              platforms.map((platform) => (
                <Link
                  key={`project-row-platform-${platform.title}`}
                  href={platform.url}
                  className="inline-flex w-fit items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  target="_blank"
                  rel="noopener"
                >
                  {platform.icon} <span className="ml-2">{platform.title}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
