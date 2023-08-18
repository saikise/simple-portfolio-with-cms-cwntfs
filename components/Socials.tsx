import Link from "next/link";

interface Social {
  key: string;
  url: string;
  icon: JSX.Element;
}

interface SocialsProps {
  socials: Social[];
}

export default function Socials({ socials }: SocialsProps) {
  return (
    <ul className="flex flex-nowrap">
      {socials.map((social) => (
        <li key={social.key}>
          <Link
            href={social.url}
            target="_blank"
            rel="noopener"
            className="group flex items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            {social.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}
