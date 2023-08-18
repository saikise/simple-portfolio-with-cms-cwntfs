import { SERIES_LIST, SOCIALS } from "@/constants/data";
import { FOLDER_ICON, HOME_ICON, SEARCH_ICON } from "../constants/icons";
import SidebarItem from "./SidebarItem";
import SidebarToggleClose from "./SidebarToggleClose";
import Socials from "./Socials";

export default async function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white transition-transform dark:border-gray-700 dark:bg-gray-800 md:translate-x-0"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full overflow-y-auto bg-white px-3 py-5 dark:bg-gray-800">
        <ul className="space-y-2">
          <li key="sidebarToggleClose" className="flex h-fit justify-end">
            <SidebarToggleClose />
          </li>
          <li key="sidebarItemHome">
            <SidebarItem title="Home" url="/" icon={HOME_ICON} />
          </li>
          <li key="sidebarItemSearch">
            <SidebarItem title="Search" url={"/search"} icon={SEARCH_ICON} />
          </li>
        </ul>
        <ul className="mt-5 space-y-2 border-t border-gray-200 pt-5 dark:border-gray-700">
          {SERIES_LIST.map((series) => (
            <li key={series.code}>
              <SidebarItem
                title={series.title}
                url={series.code}
                icon={series.icon || FOLDER_ICON}
              />
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 left-0 z-20 w-full space-x-4 bg-white px-4 pb-4 dark:bg-gray-800 lg:flex">
          <div className="flex w-full flex-nowrap justify-center gap-2">
            <span className="flex flex-nowrap items-center justify-center whitespace-nowrap text-sm text-gray-900 dark:text-white">
              Socials
            </span>
            <span className="flex flex-nowrap items-center justify-center whitespace-nowrap text-sm text-gray-900 dark:text-white">
              •
            </span>
            <Socials socials={SOCIALS} />
          </div>
        </div>
      </div>
    </aside>
  );
}
