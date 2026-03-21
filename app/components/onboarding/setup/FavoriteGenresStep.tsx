import { Button } from "~/components/ui/button";
import { SearchBar } from "~/components/ui/searchbar";

type FavoriteGenresStepProps = {
  onNext: () => void;
  genres: genres[];
};

const heading = "What’s Your Favorite\nGenres?";
const text =
  "What do you love to read? Select your favorite\ngenres to help us recommend books you’ll\nenjoy.";

export default function FavoriteGenresStep({
  onNext,
  genres,
}: FavoriteGenresStepProps) {
  return (
    <>
      {/* Heading */}
      <div className="w-full text-left">
        <h1 className="onboarding-title whitespace-pre-line">{heading}</h1>
      </div>

      {/* Text */}
      <p className="mt-4 whitespace-pre-line">{text}</p>

      <SearchBar placeholder="Search..." className="mt-[clamp(8px,2vh,16px)]" />

      {/* Book covers */}
      <div className="w-full text-right mt-[clamp(14px,2vh,28px)]">
        <div className="flex justify-center flex-wrap gap-2 border-">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              className="w-24 h-32 rounded-[10px] shadow-md"
            >
              {genre.name}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
