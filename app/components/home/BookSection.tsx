import BookCard, { type BookCardItem } from "./BookCard";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";

type BookSectionProps = {
  sectionTitle: string;
  books: BookCardItem[];
  morePath: string;
};

export default function BookSection({
  sectionTitle,
  books,
  morePath,
}: BookSectionProps) {
  const [emblaCarousel] = useEmblaCarousel({
    dragFree: true,
    loop: false,
    align: "start",
  });

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold leading-[22px]">
          {sectionTitle}
        </div>
        <Link to={morePath} className="inline-flex items-center leading-none">
          More {<img src="/globalImages/more-arrow.svg" alt="Go to More" />}
        </Link>
      </div>

      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={emblaCarousel}
      >
        <ul className="flex gap-[20px]">
          {books.map((book) => (
            <li key={book.id} className="shrink-0">
              <BookCard
                title={book.title}
                coverImage={book.coverImage}
                progressPercentage={book.progressPercentage}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
