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
}
