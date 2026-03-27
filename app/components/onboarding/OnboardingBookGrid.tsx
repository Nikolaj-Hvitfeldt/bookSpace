type BookCovers = { id: string; coverUrl: string };
type OnboardingBookCoverGridProps = {
  books: BookCovers[];
  maxBooks?: number;
};
export default function OnboardingBookCardGrid({
  books,
  maxBooks = 9,
}: OnboardingBookCoverGridProps) {
  const shown = books.slice(0, maxBooks);
  return (
    <div className="mx-auto w-fit">
      <ul className="grid grid-cols-3 gap-2">
        {shown.map((book) => (
          <li key={book.id}>
            <img
              src={book.coverUrl}
              alt=""
              className="w-24 h-32 rounded-[10px] shadow-md"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
