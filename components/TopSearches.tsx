import Link from "next/link";
import { TOP_SEARCHES } from "../constants/data";

export default function TopSearches() {
  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-xl font-semibold text-white">Top searches</h5>
      <ul className="pl-4">
        {TOP_SEARCHES.map(({ title, url }) => (
          <li key={title}>
            <div className="flex items-center gap-2 p-2">
              <svg
                className="h-[15px] w-[15px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <Link href={url}>
                <p className="text-sm text-white hover:underline">{title}</p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
