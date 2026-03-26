import type { Route } from "./+types/filtersResult";

export async function loader({}: Route.LoaderArgs) {
  return {
    books: [],
    appliedFilters: {
      moods: [] as string[],
      tags: [] as string[],
    },
  };
}

export default function FiltersResult({ loaderData }: Route.ComponentProps) {
  const { books, appliedFilters } = loaderData;

  return (
    <div>
      <h1>Filters Result goes here</h1>
    </div>
  );
}
