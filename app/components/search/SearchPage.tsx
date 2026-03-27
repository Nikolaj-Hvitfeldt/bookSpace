import { SearchBar } from "~/components/ui/searchbar";
import TabSlider, { type tabItem } from "~/components/ui/tabSlider";
import { useState, useMemo } from "react";
import { Link } from "react-router";
import type { GenreWithCovers } from "~/db/queries/genres.server";
import type { BookList } from "~/types/bookList";
import BookCardGrid from "./BookCardGrid";
import FiltersPanel from "./FiltersPanel";

type SearchTab = "Search" | "Filters";

const searchTabs: tabItem[] = [
  { label: "Search", value: "Search" },
  { label: "Filters", value: "Filters" },
];

type SearchPageProps = {
  genres: GenreWithCovers[];
  books: BookList[];
};

function SearchHeader({
  selectedTab,
  setSelectedTab,
  query,
  setQuery,
}: {
  selectedTab: SearchTab;
  setSelectedTab: (value: SearchTab) => void;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <SearchBar
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <TabSlider
        items={searchTabs}
        value={selectedTab}
        onChange={(value) => setSelectedTab(value as SearchTab)}
      />
    </div>
  );
}

function GenreCard({
  name,
  slug,
  covers,
}: {
  name: string;
  slug: string;
  covers: [string, string, string];
}) {
  return (
    <Link
      to={`/books/genres/${slug}`}
      className="relative block aspect-4/3 w-full overflow-hidden rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/40"
    >
      <div className="absolute inset-0 flex min-h-0 min-w-0">
        {covers.map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            className="h-full min-w-0 flex-1 object-cover"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
      <div className="absolute bottom-2 left-2 z-10 maw-w-[90%] text-lg font-semibold leading-tight text-white drop-shadow-md">
        {name}
      </div>
    </Link>
  );
}

export default function SearchPage({ genres, books }: SearchPageProps) {
  const [selectedTab, setSelectedTab] = useState<SearchTab>("Search");
  const [query, setQuery] = useState("");
  const [visibleGenresCount, setVisibleGenresCount] = useState(6);

  //filter genres by query
  const filteredGenres = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return genres;

    return genres.filter((genre) => genre.name.toLowerCase().includes(q));
  }, [query, genres]);

  const shownGenres = filteredGenres.slice(0, visibleGenresCount);

  //filter books by query
  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return books;

    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.authors.some((author) => author.toLowerCase().includes(q)),
    );
  }, [query, books]);

  return (
    <div>
      <SearchHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        query={query}
        setQuery={setQuery}
      />

      <div className="mt-5 flex-1 min-h-0 flex flex-col">
        {selectedTab === "Search" ? (
          <>
            <div className="mt-5">
              <h2 className="mb-2 text-[18px] font-semibold! leading-[22px] text-black">
                Search by Genres:
              </h2>

              {shownGenres.length === 0 ? (
                <p className="pt-2 text-black/70!">No genre found</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {shownGenres.map((genre) => (
                    <GenreCard
                      key={genre.slug}
                      name={genre.name}
                      slug={genre.slug}
                      covers={genre.urls as [string, string, string]}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 w-full border-t border-primary-brown pt-5">
              <h2 className="mb-2 text-[18px] font-semibold! leading-[22px] text-black">
                Search Books by Title or Author:
              </h2>
              <div className="max-w-[330px] pt-2">
                {filteredBooks.length === 0 ? (
                  <p className="text-black/70!">No book found</p>
                ) : (
                  <BookCardGrid books={filteredBooks} maxBooks={4} />
                )}
              </div>
            </div>
          </>
        ) : (
          <FiltersPanel />
        )}
      </div>
    </div>
  );
}
