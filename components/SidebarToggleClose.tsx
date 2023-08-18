export default function SidebarToggleClose() {
  return (
    <button
      data-drawer-target="drawer-navigation"
      data-drawer-toggle="drawer-navigation"
      aria-controls="drawer-navigation"
      className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 md:hidden"
    >
      <svg
        className="h-[13px] w-[13px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
        />
      </svg>
    </button>
  );
}
