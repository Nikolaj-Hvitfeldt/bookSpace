import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/app.tsx", [
    index("routes/home.tsx"),
    route("books/currently-reading", "routes/currentlyReading.tsx"),
    route("books/recommended", "routes/recommended.tsx"),
    route("books/popular", "routes/popular.tsx"),
    route("books/short-escapes", "routes/shortEscapes.tsx"),
    route("books/epic-journeys", "routes/epicJourneys.tsx"),
    route("books/:bookSlug", "routes/bookDetails.tsx"),
    route("books/genres/:genreSlug", "routes/genreBooks.tsx"),
    route("authors/:authorSlug", "routes/authorBooks.tsx"),
  ]),
  layout("layouts/authLayout.tsx", [
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
  ]),
  layout("layouts/onboardingLayout.tsx", [
    route("onboarding/landing", "routes/onboarding/landing.tsx"),
    route("onboarding/recommendation", "routes/onboarding/recommendation.tsx"),
    route("onboarding/community", "routes/onboarding/community.tsx"),
    route("onboarding/tracking", "routes/onboarding/tracking.tsx"),
    route("onboarding/get-started", "routes/onboarding/getStarted.tsx"),
    route("onboarding/favorite-books", "routes/onboarding/favoriteBooks.tsx"),
    route("onboarding/favorite-genres", "routes/onboarding/favoriteGenres.tsx"),
    route(
      "onboarding/favorite-authors",
      "routes/onboarding/favoriteAuthors.tsx",
    ),
    route("onboarding/reading-goals", "routes/onboarding/readingGoals.tsx"),
    route(
      "onboarding/reading-experience",
      "routes/onboarding/readingExperience.tsx",
    ),
  ]),
] satisfies RouteConfig;
