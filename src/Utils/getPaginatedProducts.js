export default function getPaginatedProducts(
  products,
  currentPage,
  productsPerPage
) {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return products.slice(
    startIndex,
    endIndex
  ); /* if need it Math.max([product.length, endIndex]) */
}
