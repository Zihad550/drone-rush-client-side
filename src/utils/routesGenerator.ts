import type { IRoute, IUserPath } from "@/types";

export const routeGenerator = (paths: IUserPath[]) => {
  const routes = paths.reduce<IRoute[]>((acc, cur) => {
    if (cur.element) {
      acc.push({
        path: cur.path ?? "",
        element: cur.element,
      });
    }
    if (cur.children) {
      cur.children.forEach((child) => {
        acc.push({
          path: child.path,
          element: child.element,
        });
      });
    }
    return acc;
  }, []);
  return routes;
};
