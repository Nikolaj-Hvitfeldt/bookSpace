import { SearchBar } from "~/components/ui/searchbar";

type HomeHeaderProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
};

export default function HomeHeader({
  searchValue,
  onSearchChange,
}: HomeHeaderProps) {
  return (
    <header className="w-full">
      <SearchBar
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
      ></SearchBar>

      <div className="space-y-2 mt-2">
        <div className="text-[18px] font-semibold leading-[22px]">Discover</div>
        <div className="relative h-[110px] w-full overflow-hidden rounded-[10px] bg-primary-grey/20"></div>
      </div>
    </header>
  );
}
