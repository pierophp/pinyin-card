import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Categories.tsx"),
  route("category/:id/:type?", "routes/Categories.tsx", {
    id: "category/:id/:type?",
  }),
  route("v0", "routes/V0.tsx"),
] satisfies RouteConfig;
