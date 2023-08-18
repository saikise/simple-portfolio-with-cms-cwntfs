import { Project, Series } from "@/lib/types";
import {
  DEMO_ICON,
  DESKTOP_ICON,
  GITHUB_ICON,
  MEDIUM_ICON,
  MOBILE_ICON,
  WEB_ICON,
  YOUTUBE_ICON,
} from "./icons";

export const ALL: Series = {
  code: "all",
  title: "All",
  description: "All projects.",
  icon: DEMO_ICON,
};

export const SERIES_LIST: Series[] = [
  {
    code: "web-projects",
    title: "Web Projects",
    description: "My web projects mostly created with React.",
    icon: WEB_ICON,
  },
  {
    code: "mobile-projects",
    title: "Mobile Projects",
    description: "My mobile projects mostly created with React Native.",
    icon: MOBILE_ICON,
  },
  {
    code: "desktop-projects",
    title: "Desktop Projects",
    description: "My desktop projects mostly created with Electron.",
    icon: DESKTOP_ICON,
  },
];
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

const seriesObject: { [key: string]: Series } = {};
SERIES_LIST.forEach((series) => {
  seriesObject[series.code] = series;
});

export const projects: Project[] = [
  {
    id: "simple-portfolio",
    pinned: false,
    title: "Simple Portfolio",
    description:
      "Practice quick web dev with Next.js 13 (React) App Router following a single article. No backend.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "ecommerce-store",
    pinned: false,
    title: "Ecommerce Store",
    description:
      "A full-stack ecommerce store built with React, Node.js, and MongoDB. Features include user authentication, product search and filtering, and shopping cart functionality.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "social-media-app",
    pinned: false,
    title: "Social Media App",
    description:
      "A social media app built with React, Node.js, and MongoDB. Features include user authentication, post creation and commenting, and user profiles.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "recipe-app",
    pinned: false,
    title: "Recipe App",
    description:
      "A recipe app built with React and the Edamam API. Features include recipe search and filtering, ingredient list, and nutrition information.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "movie-app",
    pinned: false,
    title: "Movie App",
    description:
      "A movie app built with React and the TMDB API. Features include movie search and filtering, movie details, and user ratings.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "music-app",
    pinned: false,
    title: "Music App",
    description:
      "A music app built with React and the Spotify API. Features include music search and filtering, album details, and user playlists.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "news-app",
    pinned: false,
    title: "News App",
    description:
      "A news app built with React and the NewsAPI. Features include news search and filtering, article details, and user bookmarks.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "job-board",
    pinned: false,
    title: "Job Board",
    description:
      "A job board app built with React and the GitHub Jobs API. Features include job search and filtering, job details, and user job applications.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "chat-app",
    pinned: false,
    title: "Chat App",
    description:
      "A chat app built with React and Firebase. Features include user authentication, real-time messaging, and user profiles.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "blog-app",
    pinned: false,
    title: "Blog App",
    description:
      "A blog app built with React and the WordPress API. Features include blog search and filtering, post details, and user comments.",
    image: "/images/project-image.png",
    series: seriesObject["web-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "weather-app",
    pinned: false,
    title: "Weather App",
    description:
      "A weather app built with React Native and the OpenWeatherMap API. Features include current weather conditions, hourly and daily forecasts, and user location detection.",
    image: "/images/project-image.png",
    series: seriesObject["mobile-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "food-delivery-app",
    pinned: false,
    title: "Food Delivery App",
    description:
      "A food delivery app built with React Native and the Uber Eats API. Features include restaurant search and filtering, menu items, and user orders.",
    image: "/images/project-image.png",
    series: seriesObject["mobile-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "fitness-app",
    pinned: false,
    title: "Fitness App",
    description:
      "A fitness app built with React Native and the Fitbit API. Features include workout tracking, step counting, and user goals.",
    image: "/images/project-image.png",
    series: seriesObject["mobile-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "travel-app",
    pinned: false,
    title: "Travel App",
    description:
      "A travel app built with React Native and the TripAdvisor API. Features include destination search and filtering, hotel details, and user reviews.",
    image: "/images/project-image.png",
    series: seriesObject["mobile-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "language-learning-app",
    pinned: false,
    title: "Language Learning App",
    description:
      "A language learning app built with React Native and the Duolingo API. Features include language selection, lesson plans, and user progress tracking.",
    image: "/images/project-image.png",
    series: seriesObject["mobile-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "Note-taking app",
    pinned: false,
    title: "Note-taking app",
    description:
      "A note-taking app built with Electron and the Duolingo API. Features include language selection, lesson plans, and user progress tracking.",
    image: "/images/project-image.png",
    series: seriesObject["desktop-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "Music Player",
    pinned: false,
    title: "Music Player",
    description: "A music player app built with Electron.",
    image: "/images/project-image.png",
    series: seriesObject["desktop-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
  {
    id: "Study Spatial Repetition App",
    pinned: false,
    title: "Study Spatial Repetition App",
    description:
      "A Study Spatial Repetition App built with Electron. Features include language selection, lesson plans, and user progress tracking.",
    image: "/images/project-image.png",
    series: seriesObject["desktop-projects"],
    platforms: [
      {
        title: "Live Demo",
        url: "/demo",
        icon: DEMO_ICON,
      },
    ],
  },
];
