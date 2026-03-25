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
};

export type BookDetail = {
  id: string;
  title: string;
  authors: string[];
  coverImage: string;
  rating: number;
  pageCount: number;
  description: string;
  genres: string[];
  isBookmarked?: boolean;
};
