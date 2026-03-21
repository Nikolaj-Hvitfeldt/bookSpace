import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/app.tsx", [index("routes/home.tsx")]),
  layout("layouts/authLayout.tsx", [
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
  ]),
  layout("layouts/onboardingLayout.tsx", [
    route("onboarding/landing", "routes/onboarding/landing.tsx"),
    route("onboarding/recommendation", "routes/onboarding/recommendation.tsx"),
    route("onboarding/community", "routes/onboarding/community.tsx"),
    route("onboarding/tracking", "routes/onboarding/tracking.tsx"),
    route("onboarding/get-started", "routes/onboarding/getStarted.tsx"),
    route("onboarding/favorite-books", "routes/onboarding/favoriteBooks.tsx"),
  ]),
] satisfies RouteConfig;
