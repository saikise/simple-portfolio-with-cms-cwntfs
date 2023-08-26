export interface Series {
  id: string;
  code: string;
  title: string;
  description: string;
  icon?: JSX.Element;
}

export interface Platform {
  id: string;
  title: string;
  url: string;
  icon: JSX.Element;
}

export type Project = {
  id: string;
  pinned?: boolean;
  title: string;
  description: string;
  image: string;
  imageUrl: string;
  series: Series;
  platforms: Platform[];
};

export type IconsType = {
  [key: string]: JSX.Element;
};
