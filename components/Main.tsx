import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export default function Main({ children }: MainProps) {
  return <main className="p-4 px-4 md:ml-64">{children}</main>;
}
