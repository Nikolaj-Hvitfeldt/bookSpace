export type BookList = {
  id: string;
  title: string;
  authors: string[];
  coverImage: string;
  rating: number;
  progressPercentage?: number;
  currentPage?: number;
  pageCount?: number;
  isBookmarked?: boolean;
  bookSlug?: string;
};
