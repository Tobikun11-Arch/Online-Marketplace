export function generatePageItem(totalPages: number, currentPage: number) {
  const pages: Array<{ type: 'page' | 'ellipsis'; number?: number }> = [];
  const maxVisiblePages = 5; // Number of visible pages before adding ellipsis

  // Always show the first page
  pages.push({ type: 'page', number: 1 });

  // Add ellipsis if current page is far from the start
  if (currentPage > maxVisiblePages) {
    pages.push({ type: 'ellipsis' });
  }

  // Add pages around the current page
  const start = Math.max(2, currentPage - 2);
  const end = Math.min(totalPages - 1, currentPage + 2);

  for (let i = start; i <= end; i++) {
    pages.push({ type: 'page', number: i });
  }

  // Add ellipsis if current page is far from the end
  if (currentPage < totalPages - (maxVisiblePages - 1)) {
    pages.push({ type: 'ellipsis' });
  }

  // Always show the last page
  if (totalPages > 1) {
    pages.push({ type: 'page', number: totalPages });
  }

  return pages;
}