import { Button } from "~/components/ui/button";
import { SearchBar } from "~/components/ui/searchbar";
import type { Authors } from "~/db/queries/authors";
import { useState, useEffect, useMemo } from "react";

type FavoriteAuthorsStepProps = {
  onNext: () => void;
  authors: Authors[];
};

const heading = "Who Are Your Go-To\nAuthors?";
const text =
  "Tell us your favorite authors so we can suggest books and authors similar to your taste.";

const favoriteAuthorsKey = "favorite-authors";

export default function FavoriteAuthorsStep({
  onNext,
  authors,
}: FavoriteAuthorsStepProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    try {
      const storedIds = sessionStorage.getItem(favoriteAuthorsKey);
      return storedIds ? JSON.parse(storedIds) : [];
    } catch (error) {
      console.error("Error getting favorite authors:", error);
      return [];
    }
  });

  const toggleAuthors = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id],
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authors;

    const query = searchQuery.toLowerCase().trim();
    return authors.filter((author) =>
      author.name.toLowerCase().includes(query),
    );
  }, [authors, searchQuery]);

  useEffect(() => {
    sessionStorage.setItem(favoriteAuthorsKey, JSON.stringify(selectedIds));
  }, [selectedIds]);

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
          {filteredAuthors.map((author) => {
            const isSelected = selectedIds.includes(author.id);
            return (
              <Button
                variant={isSelected ? "primary" : "secondary"}
                size="small"
                key={author.id}
                onClick={() => toggleAuthors(author.id)}
                className="grow shrink basis-auto w-fit! px-3! py-2! rounded-[10px] shadow-md"
              >
                {author.name}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// So we can use it in the other steps / when onboarding
export { favoriteAuthorsKey };
