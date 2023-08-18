"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { DEFAULT_BLUR_DATA_URL } from "../constants/colors";
import { Project } from "../lib/types";

export type ProjectCardProps = Project;

export default function ProjectCard({
  id,
  description,
  image,
  title,
  platforms,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={`project-card-${id}`}
      className="flex h-full w-full flex-col rounded-lg border border-gray-200 bg-white p-4 shadow transition duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
        <Image
          src={image}
          fill
          alt={`Picture of project ${title}`}
          // For some reason, object-fit is not working. So, I used the next/image's objectFit prop instead.
          object-fit="cover"
          objectFit="cover"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 transition duration-300 ease-in-out ${
            isHovered
              ? "bg-black bg-opacity-60"
              : "pointer-events-none opacity-0"
          }`}
        >
          {platforms.length &&
            platforms.map((platform) => (
              <Link
                key={`project-card-platform-${platform.title}`}
                href={platform.url}
                target="_blank"
                rel="noopener"
                className="inline-flex w-10/12 items-center justify-center rounded-lg bg-gray-50 px-3 py-2.5 text-base font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {platform.icon}
                <span className="mx-2 w-full font-light text-white">
                  {platform.title}
                </span>
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            ))}
        </div>
      </div>
      <div className="flex flex-grow flex-col justify-between gap-4">
        <div>
          <h5 className="text-md line-clamp-2 font-bold text-white">{title}</h5>
          <p className="mt-2 line-clamp-2 text-xs text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
