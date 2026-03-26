import { data } from "react-router";
import { getBooksByFilters } from "~/db/queries/books.server";

// maps comma separated values to an array of strings
function normalize(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return [];
  return value
    .split(",")
    .map((val) => val.trim().toLowerCase())
    .filter(Boolean);
}

export async function searchFiltersAction(request: Request) {
  const formData = await request.formData();

  const moods = normalize(formData.get("moods"));
  const tags = normalize(formData.get("tags"));

  const books =
    moods.length === 0 && tags.length === 0
      ? []
      : await getBooksByFilters({ moods, tags });

  return data({
    books,
  });
}
