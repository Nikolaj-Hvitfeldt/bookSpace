import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("layouts/app.tsx", [index("routes/home.tsx")]),
  layout("layouts/authLayout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),
] satisfies RouteConfig;
