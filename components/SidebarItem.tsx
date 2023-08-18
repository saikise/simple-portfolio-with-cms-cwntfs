"use client";

import Link from "next/link";

interface SidebarItemProps {
  title: string;
  url: string;
  icon: JSX.Element;
}

export default function SidebarItem({ title, url, icon }: SidebarItemProps) {
  return (
    <>
      <button
        className="hidden"
        data-drawer-target="drawer-navigation"
        data-drawer-toggle="drawer-navigation"
        aria-controls="drawer-navigation"
        aria-hidden="true"
      ></button>
      <Link
        href={url}
        className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {icon}
        <span className="ml-4 text-sm">{title}</span>
      </Link>
    </>
  );
}
