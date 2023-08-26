import { Series } from "@/lib/types";
import { DEMO_ICON, GITHUB_ICON, MEDIUM_ICON, YOUTUBE_ICON } from "./icons";

export const ALL: Series = {
  id: "all",
  code: "all",
  title: "All",
  description: "All projects.",
  icon: DEMO_ICON,
};

export const TOP_SEARCHES = [
  {
    title: "React",
    url: "/search?q=React",
  },
  {
    title: "Flutter",
    url: "/search?q=Flutter",
  },
  {
    title: "App",
    url: "/search?q=App",
  },
  {
    title: "Chat",
    url: "/search?q=Chat",
  },
  {
    title: "Electron",
    url: "/search?q=Electron",
  },
];
export const SOCIALS = [
  {
    key: "socialsMedium",
    url: "https://medium.com/@saikise",
    icon: MEDIUM_ICON,
  },
  {
    key: "socialsGitHub",
    url: "https://github.com/saikise",
    icon: GITHUB_ICON,
  },
  {
    key: "socialsYouTube",
    url: "https://youtube.com/@saikise",
    icon: YOUTUBE_ICON,
  },
];
