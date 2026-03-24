import BookCard, { type BookCardItem } from "./BookCard";
import useEmblaCarousel from "embla-carousel-react";

type BookSectionProps = {
  sectionTitle: string;
  books: BookCardItem[];
};

export default function BookSection({ sectionTitle, books }: BookSectionProps) {
  const [emblaCarousel] = useEmblaCarousel({
    dragFree: true,
    loop: true,
    align: "start",
  });

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold leading-[22px]">
          {sectionTitle}
        </div>
        <button type="button" className="inline-flex items-center leading-none">
          More {<img src="/globalImages/more-arrow.svg" alt="More" />}
        </button>
      </div>

      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={emblaCarousel}
      >
        <ul className="flex gap-[10px]">
          {books.map((book) => (
            <li key={book.id} className="shrink-0">
              <BookCard title={book.title} coverImage={book.coverImage} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
