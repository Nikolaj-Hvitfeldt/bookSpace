import { useFetcher } from "react-router";
export type BookmarkActionData = {
  success: boolean;
  bookmarked?: boolean;
  error?: string;
};
type BookmarkButtonProps = {
  bookId: string;
  isBookmarked: boolean;
  className?: string;
};

function BookmarkIconEmpty({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M1 5C1 3.6 1 2.9 1.2725 2.365C1.51218 1.89462 1.89462 1.51218 2.365 1.2725C2.9 1 3.6 1 5 1H12C13.4 1 14.1 1 14.635 1.2725C15.1054 1.51218 15.4878 1.89462 15.7275 2.365C16 2.9 16 3.6 16 5V21.6313C16 22.2388 16 22.5425 15.8738 22.7088C15.8192 22.7811 15.7496 22.8406 15.6697 22.8834C15.5899 22.9261 15.5017 22.951 15.4112 22.9563C15.2025 22.9688 14.95 22.8 14.445 22.4638L8.5 18.5L2.555 22.4625C2.05 22.8 1.7975 22.9688 1.5875 22.9563C1.49729 22.9508 1.40935 22.9258 1.32972 22.8831C1.25009 22.8404 1.18067 22.7809 1.12625 22.7088C1 22.5425 1 22.2388 1 21.6313V5Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BookmarkIconFilled({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M7.5 7.75C7.5 6.35 7.5 5.65 7.7725 5.115C8.01218 4.64462 8.39462 4.26218 8.865 4.0225C9.4 3.75 10.1 3.75 11.5 3.75H18.5C19.9 3.75 20.6 3.75 21.135 4.0225C21.6054 4.26218 21.9878 4.64462 22.2275 5.115C22.5 5.65 22.5 6.35 22.5 7.75V24.3813C22.5 24.9888 22.5 25.2925 22.3738 25.4588C22.3192 25.5311 22.2496 25.5906 22.1697 25.6334C22.0899 25.6761 22.0017 25.701 21.9112 25.7063C21.7025 25.7188 21.45 25.55 20.945 25.2138L15 21.25L9.055 25.2125C8.55 25.55 8.2975 25.7188 8.0875 25.7063C7.99729 25.7008 7.90935 25.6758 7.82972 25.6331C7.75009 25.5904 7.68067 25.5309 7.62625 25.4588C7.5 25.2925 7.5 24.9888 7.5 24.3813V7.75Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BookmarkButton({
  bookId,
  isBookmarked: initialBookmarked,
  className,
}: BookmarkButtonProps) {
  const fetcher = useFetcher<BookmarkActionData>();
  const bookmarked =
    fetcher.data?.success === true &&
    typeof fetcher.data.bookmarked === "boolean"
      ? fetcher.data.bookmarked
      : initialBookmarked;
  return (
    <fetcher.Form method="post" action="." className={className}>
      <input type="hidden" name="bookId" value={bookId} />
      <button
        type="submit"
        className="shrink-0 rounded p-1 text-black/60 hover:text-black disabled:opacity-50"
        disabled={fetcher.state !== "idle"}
      >
        <div className="block text-[20px] leading-none">
          {bookmarked ? (
            <BookmarkIconFilled className="h-6 w-6" />
          ) : (
            <BookmarkIconEmpty className="h-6 w-6" />
          )}
        </div>
      </button>
    </fetcher.Form>
  );
}
