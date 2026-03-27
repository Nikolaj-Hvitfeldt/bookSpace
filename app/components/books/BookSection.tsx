import BookCard, { type BookCardItem } from "./BookCard";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "react-router";
import { useRef, useEffect } from "react";

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
  const [emblaref, emblaApi] = useEmblaCarousel({
    dragFree: true,
    loop: false,
    align: "start",
  });

  //variable to track if user dragged
  const draggingRef = useRef(false);

  useEffect(() => {
    if (!emblaApi) return;

    // listen for pointer down, scroll, and settle events and update draggingRef accordingly
    // pointerDown: user started dragging
    // scroll: user is dragging
    // settle: user stopped dragging
    const onPointerDown = () => {
      draggingRef.current = false;
    };
    const onScroll = () => {
      draggingRef.current = true;
    };
    const onSettle = () => {
      draggingRef.current = false;
    };

    // add event listeners for pointer down, scroll, and settle events
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("settle", onSettle);

    // remove event listeners when done
    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("settle", onSettle);
    };
  }, [emblaApi]);

  function handleCardClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // If user is dragging, prevent default behavior - in this case, dont navigate to the details page
    if (draggingRef.current) {
      event.preventDefault();
    }
  }

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
        ref={emblaref}
      >
        <ul className="flex gap-[20px]">
          {books.map((book) => (
            <Link to={`/books/${book.slug ?? ""}`} onClick={handleCardClick}>
              <li key={book.id} className="shrink-0">
                <BookCard
                  title={book.title}
                  coverImage={book.coverImage}
                  progressPercentage={book.progressPercentage}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
