import type { ReactNode } from "react";

export interface IUserPath {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: { name?: string; path: string; element: ReactNode }[];
}

export interface IRoute {
  path: string;
  element: ReactNode;
  index?: boolean;
}

export interface INavItem {
  key: string;
  label?: ReactNode;
  path: string;
  children?: { key: string; label?: ReactNode; path: string }[];
}
