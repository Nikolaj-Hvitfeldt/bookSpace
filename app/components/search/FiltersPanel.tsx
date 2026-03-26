import { Button } from "../ui/button";

function SearchFiltersAccordion({ title }: { title: string }) {
  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function SearchFiltersButtonFooter() {
  return (
    <div className="flex justify-between">
      <Button
        size="small"
        className="w-[165px] h-[40px] p-[10px] flex items-center justify-center gap-[10px]"
      >
        Save
      </Button>
      <Button
        variant="secondary"
        className="font-semibold! w-[165px] h-[40px] p-[10px] flex items-center justify-center gap-[10px]"
        size="small"
      >
        Clear All
      </Button>
    </div>
  );
}

export default function FiltersPanel() {
  return (
    <div>
      <div className="mt-5 flex flex-col justify-between gap-6">
        <SearchFiltersAccordion title="Book by Mood & Emotions" />
        <SearchFiltersAccordion title="Book by Character & Plot" />
        <SearchFiltersButtonFooter />
      </div>
    </div>
  );
}
