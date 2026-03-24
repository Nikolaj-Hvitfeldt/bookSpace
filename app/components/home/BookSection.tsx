import BookCard from "./BookCard";

type Book = {
  id: string;
  title: string;
  coverImage: string;
};

type BookSectionProps = {
  sectionTitle: string;
  books: Book[];
};

export default function BookSection({ sectionTitle, books }: BookSectionProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-[18px] font-semibold leading-[22px]">
          {sectionTitle}
        </div>
        <button
          type="button"
          className="text-[16px] inline-flex items-center leading-none"
        >
          More {<img src="/globalImages/more-arrow.svg" alt="More" />}
        </button>
      </div>

      <div className="flex overflow-x-auto pb-[6ox] gap[10px] [&::-webkit-scrollbar]:hidden">
        <ul className="snap-x snap-mandatory">
          {books.map((book) => (
            <li className="snap-start" key={book.id}>
              <BookCard title={book.title} coverImage={book.coverImage} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
