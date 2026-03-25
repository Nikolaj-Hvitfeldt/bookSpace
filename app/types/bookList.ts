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

export type BookDetail = {
  id: string;
  title: string;
  authors: string[];
  authorSlugs: string[];
  coverImage: string;
  rating: number;
  pageCount: number;
  description: string;
  genres: string[];
  genreSlugs: string[];
  isBookmarked?: boolean;
  bookSlug: string;
};
