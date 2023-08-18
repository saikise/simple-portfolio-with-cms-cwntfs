import Script from "next/script";
import Shell from "../components/Shell";
import "./globals.css";

export const metadata = {
  title: "Demo of simple-portfolio-cwntf",
  description:
    "Code Practice: Simple Portfolio — Next.js 13 App Router, Tailwind CSS, Flowbite",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <Shell>{children}</Shell>
        {/* 
          The purpose of this JavaScript is the same as loading external script from Flowbite to add listeners to elements and make them interactive.
          This script opens or closes the sidebar by altering the Tailwind CSS classes. We could've used React state, but I found the approach of loading listeners more straightforward for toggling the sidebar and enabling us to maintain the use of server components (Using React states will require us to use client components). 

          References:
          1. https://nextjs.org/docs/getting-started/react-essentials#thinking-in-server-components
          2. https://nextjs.org/docs/app/building-your-application/optimizing/scripts
          3. https://flowbite.com/docs/getting-started/quickstart/#data-attributes
        */}
        <Script id="toggles">
          {`
            document.querySelectorAll('[data-drawer-toggle="drawer-navigation"]').forEach((element) => {
              element.addEventListener('click', () => {
                const sidebar = document.getElementById('drawer-navigation');
                sidebar.classList.toggle('translate-x-0');
                sidebar.classList.toggle('-translate-x-full');
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}
