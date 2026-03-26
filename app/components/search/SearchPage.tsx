import { SearchBar } from "~/components/ui/searchbar";
import TabSlider, { type tabItem } from "~/components/ui/tabSlider";
import { useState } from "react";

type SearchTab = "Genres" | "Filters";

const searchTabs: tabItem[] = [
  { label: "Genres", value: "Genres" },
  { label: "Filters", value: "Filters" },
];

function SearchHeader() {
  const [selectedTab, setSelectedTab] = useState<SearchTab>("Genres");
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

export default function SearchPage() {
  return (
    <div>
      <SearchHeader />
    </div>
  );
}
