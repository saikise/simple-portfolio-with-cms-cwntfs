import { ReactNode } from "react";
import Main from "./Main";
import Sidebar from "./Sidebar";
import SidebarToggle from "./SidebarToggle";

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="bg-gray-50 antialiased dark:bg-gray-900">
      <SidebarToggle />
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
}
