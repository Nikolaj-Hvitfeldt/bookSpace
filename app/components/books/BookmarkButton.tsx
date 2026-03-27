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

export function BookmarkButton({
  bookId,
  isBookmarked: initialBookmarked,
  className,
}: BookmarkButtonProps) {
  const fetcher = useFetcher<BookmarkActionData>();
  const isSubmitting = fetcher.state !== "idle";
  const isBookmarkSubmit = fetcher.formData?.get("submitFor") === "bookmark";

  const optimisticUpdate =
    isSubmitting && isBookmarkSubmit ? !initialBookmarked : undefined;

  const bookmarked =
    typeof optimisticUpdate === "boolean"
      ? optimisticUpdate
      : fetcher.data?.success === true &&
          typeof fetcher.data.bookmarked === "boolean"
        ? fetcher.data.bookmarked
        : initialBookmarked;
  return (
    <fetcher.Form method="post" action="." className={className}>
      <input type="hidden" name="bookId" value={bookId} />
      <input type="hidden" name="submitFor" value="bookmark" />
      <button
        type="submit"
        className="shrink-0 rounded p-1 text-primary-brown/60 hover:text-primary-brown"
        disabled={isSubmitting}
      >
        <div className="block text-[20px] leading-none">
          {bookmarked ? (
            <img src="/globalImages/bookmark-filled.svg" alt="Bookmark" />
          ) : (
            <img src="/globalImages/bookmark-empty.svg" alt="Bookmark" />
          )}
        </div>
      </button>
    </fetcher.Form>
  );
}
