export function pageProgressFromReading(
  bookCurrentPage: number | null | undefined,
  bookPageCount: number | null | undefined,
) {
  //Makes sure the counts are positive numbers
  const pageCount = Math.max(bookPageCount ?? 0, 0);
  const currentPage = Math.max(bookCurrentPage ?? 0, 0);

  //Calculate progress percentage
  const progressPercentage =
    pageCount > 0
      ? Math.min(100, Math.max(0, Math.round((currentPage / pageCount) * 100)))
      : 0;

  return {
    currentPage: currentPage,
    pageCount,
    progressPercentage,
  };
}
