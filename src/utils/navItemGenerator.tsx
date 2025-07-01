// import { NavLink } from "react-router";
import type { INavItem, IUserPath } from "@/types/router.type";

const generatePath = ({ role, path }: { role?: string; path?: string }) => {
  if (role) return `/${role}/dashboard/${path}`;
  else if (path) return `/${path}`;
  else return "/";
};

export const navItemGenerator = (paths: IUserPath[], role?: string) => {
  const sidebarItems = paths.reduce<INavItem[]>((acc, cur) => {
    if (cur.name) {
      acc.push({
        key: cur.name,
        path: generatePath({ role, path: cur.path }),
        icon: cur.icon,
      });
    }
    if (cur.children) {
      acc.push({
        key: cur.name as string,
        path: cur.path as string,
        children: cur.children
          .map((child) => {
            if (child.name && child.path) {
              return {
                key: child.name as string,
                path: generatePath({ role, path: child.path }),
              };
            }
            return undefined;
          })
          .filter(
            (child): child is NonNullable<typeof child> => child !== undefined,
          ),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};
