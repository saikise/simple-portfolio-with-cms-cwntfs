export interface Series {
  code: string;
  title: string;
  description: string;
  icon?: JSX.Element;
  miniIcon?: JSX.Element;
}

export interface Platform {
  title: string;
  url: string;
  icon: JSX.Element;
}

export interface Project {
  id: string;
  pinned?: boolean;
  title: string;
  description: string;
  image: string;
  series: Series;
  platforms: Platform[];
}
