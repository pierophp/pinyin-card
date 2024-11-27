import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Categories.tsx"),
  route("category/:id/:type?", "routes/Categories.tsx", {
    id: "category/:id/:type?",
  }),
] satisfies RouteConfig;
