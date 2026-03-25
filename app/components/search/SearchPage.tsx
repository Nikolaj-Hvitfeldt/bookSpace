import { SearchBar } from "~/components/ui/searchbar";
import TabSlider, { type tabItem } from "~/components/ui/tabSlider";

type SearchTab = "Genres" | "Filters";

const searchTabs: tabItem[] = [
  { label: "Genres", value: "Genres" },
  { label: "Filters", value: "Filters" },
];

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-3">
      <SearchBar placeholder="Search..." />
      <TabSlider items={searchTabs} value="Genres" onChange={() => {}} />
    </div>
  );
}
