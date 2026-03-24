export function mapAuthorNames(
  authors: { name?: string | null }[] | null | undefined,
): string[] {
  return (authors ?? [])
    .map((author) => author?.name?.trim() ?? "")
    .filter(Boolean);
}
