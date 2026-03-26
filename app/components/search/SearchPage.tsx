import { SearchBar } from "~/components/ui/searchbar";
import TabSlider, { type tabItem } from "~/components/ui/tabSlider";
import { useState, useMemo } from "react";
import { Link } from "react-router";
import type { GenreWithCovers } from "~/db/queries/genres.server";
import BookCard from "../books/BookCard";

type SearchTab = "Genres" | "Filters";

const searchTabs: tabItem[] = [
  { label: "Genres", value: "Genres" },
  { label: "Filters", value: "Filters" },
];

type SearchPageProps = {
  genres: GenreWithCovers[];
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

function SearchResultBookCard({
  title,
  coverImage,
  slug,
}: {
  title: string;
  coverImage: string;
  slug: string;
}) {
  return (
    <li className="shrink-0">
      <Link to={`/books/${slug}`} className="inline-block">
        <BookCard title={title} coverImage={coverImage} />
      </Link>
    </li>
  );
}

export default function SearchPage({ genres }: SearchPageProps) {
  const [selectedTab, setSelectedTab] = useState<SearchTab>("Genres");
  const [query, setQuery] = useState("");
  const [visibleGenresCount, setVisibleGenresCount] = useState(6);

  const filteredGenres = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return genres;

    return genres.filter((genre) => genre.name.toLowerCase().includes(q));
  }, [query, genres]);

  const shownGenres = filteredGenres.slice(0, visibleGenresCount);

  return (
    <div>
      <SearchHeader
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        query={query}
        setQuery={setQuery}
      />

      {selectedTab === "Genres" ? (
        <div className="mt-5 grid grid-cols-2 gap-4">
          {shownGenres.map((genre) => (
            <GenreCard
              key={genre.slug}
              name={genre.name}
              slug={genre.slug}
              covers={genre.urls as [string, string, string]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
