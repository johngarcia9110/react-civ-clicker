import { PublicLayout } from "@/components/layouts/PublicLayout";
import { RouteObject } from "react-router-dom";

export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <>Home</>, index: true },
      { path: "/about", element: <>About</> },
      { path: "/contact", element: <>Contact</> },
    ],
  },
] as RouteObject[];
