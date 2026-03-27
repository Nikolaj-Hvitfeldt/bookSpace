import { Button } from "~/components/ui/button";
import { SearchBar } from "~/components/ui/searchbar";
import type { Genres } from "~/db/queries/genres.server";
import { useState, useEffect, useMemo, useRef } from "react";

type FavoriteGenresStepProps = {
  onNext: () => void;
  genres: Genres[];
};

const heading = "What’s Your Favorite\nGenres?";
const text =
  "What do you love to read? Select your favorite\ngenres to help us recommend books you’ll\nenjoy.";

const favoriteGenresKey = "favorite-genres";

export default function FavoriteGenresStep({
  onNext,
  genres,
}: FavoriteGenresStepProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    try {
      const storedIds = sessionStorage.getItem(favoriteGenresKey);
      return storedIds ? JSON.parse(storedIds) : [];
    } catch (error) {
      console.error("Error getting favorite genres:", error);
      return [];
    }
  });

  const toggleGenre = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id],
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredGenres = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    const displayGenres = !query
      ? genres
      : genres.filter((genre) => genre.name.toLowerCase().includes(query));

    return displayGenres.slice(0, 15);
  }, [genres, searchQuery]);

  //ref that stores the selected ids for persistence
  const selectedIdsRef = useRef<string[]>(selectedIds);

  useEffect(() => {
    selectedIdsRef.current = selectedIds;
  }, [selectedIds]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem(
        favoriteGenresKey,
        JSON.stringify(selectedIdsRef.current),
      );
    };
  }, []);

  return (
    <>
      {/* Heading */}
      <div className="w-full text-left">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>

      {/* Text */}
      <p className="mt-4 whitespace-pre-line">{text}</p>

      <SearchBar
        placeholder="Search..."
        className="mt-[clamp(8px,2vh,16px)]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Genres */}
      <div className="w-full text-right mt-[clamp(14px,2vh,28px)]">
        <div className="flex flex-wrap gap-2 w-full">
          {filteredGenres.map((genre) => {
            const isSelected = selectedIds.includes(genre.id);
            return (
              <Button
                variant={isSelected ? "primary" : "secondary"}
                size="small"
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className="grow shrink basis-auto w-fit! px-3! py-2! rounded-[10px] shadow-md"
              >
                {genre.name}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// So we can use it in the other steps / when onboarding
export { favoriteGenresKey };
