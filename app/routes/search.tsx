import SearchPage from "~/components/search/SearchPage";
import { getGenresWithPreviewCovers } from "~/db/queries/genres.server";
import type { Route } from "./+types/search";

export async function loader({}: Route.LoaderArgs) {
  const genres = await getGenresWithPreviewCovers();
  return { genres };
}

export default function Search({ loaderData }: Route.ComponentProps) {
  return <SearchPage genres={loaderData?.genres ?? []} />;
}
