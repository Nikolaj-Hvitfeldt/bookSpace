import { SearchBar } from "~/components/ui/searchbar";
import TabSlider, { type tabItem } from "~/components/ui/tabSlider";
import { useState } from "react";
import { Link } from "react-router";

type SearchTab = "Genres" | "Filters";

export type GenreCardProps = {
  name: string;
  slug: string;
  covers: [string, string, string];
};

const searchTabs: tabItem[] = [
  { label: "Genres", value: "Genres" },
  { label: "Filters", value: "Filters" },
];

const mockCovers: [string, string, string] = [
  "https://assets.hardcover.app/book_mappings/7332844/702879986b75f035349c34acad3d94f88bb737ed.jpeg",
  "https://assets.hardcover.app/book_mappings/7332585/6e1c88b9a08b218821f23440bae0e0d500785656.jpeg",
  "https://assets.hardcover.app/editions/30390608/6f1556b0-7613-4243-bc8f-078106dd20eb-ddark.jpg",
];

const Genres: GenreCardProps[] = [
  { name: "Romance", slug: "romance", covers: mockCovers },
  { name: "Thriller", slug: "thriller", covers: mockCovers },
  { name: "Fiction", slug: "fiction", covers: mockCovers },
  { name: "Fantasy", slug: "fantasy", covers: mockCovers },
  { name: "Drama", slug: "drama", covers: mockCovers },
  { name: "Classics", slug: "classics", covers: mockCovers },
];

function SearchHeader({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: SearchTab;
  setSelectedTab: (value: SearchTab) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <SearchBar placeholder="Search..." />
      <TabSlider
        items={searchTabs}
        value={selectedTab}
        onChange={(value) => setSelectedTab(value as SearchTab)}
      />
    </div>
  );
}

function GenreCard({ name, slug, covers }: GenreCardProps) {
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

export default function SearchPage() {
  const [selectedTab, setSelectedTab] = useState<SearchTab>("Genres");
  return (
    <div>
      <SearchHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {selectedTab === "Genres" ? (
        <div className="mt-5 grid grid-cols-2 gap-4">
          {Genres.map((genre) => (
            <GenreCard key={genre.slug} {...genre} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
