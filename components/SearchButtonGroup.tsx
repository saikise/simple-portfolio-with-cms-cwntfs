import { Series } from "@/lib/types";
import Link from "next/link";

interface SearchButtonGroupProps {
  keyword: string;
  seriesCode: string;
  seriesList: Series[];
}

export default async function SearchButtonGroup({
  keyword,
  seriesCode,
  seriesList,
}: SearchButtonGroupProps) {
  return (
    <div className="inline-flex rounded-md shadow-sm" role="group">
      {seriesList.map((s, i) => {
        // If first or last button, add rounded corner.
        const addRoundedCorner =
          i === 0
            ? "rounded-l-lg"
            : i === seriesList.length - 1
            ? "rounded-r-md"
            : "";
        // Determine active button
        const isActive =
          (s.code === "all" && !seriesCode) || seriesCode === s.code;
        // Add link to button
        const url =
          s.code === "all"
            ? `/search?q=${keyword}`
            : `/search?q=${keyword}&t=${s.code}`;

        return (
          <Link
            key={`search-button-group-${s.code}`}
            href={url}
            className={`inline-flex items-center border border-gray-200 px-4 py-2 text-xs ${addRoundedCorner} hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500 ${
              !keyword && "pointer-events-none cursor-not-allowed opacity-50"
            } ${
              isActive && !!keyword
                ? "bg-gray-100 text-blue-700 dark:bg-gray-600"
                : "bg-white text-gray-900 dark:bg-gray-700"
            }`}
          >
            {s.title}
          </Link>
        );
      })}
    </div>
  );
}
