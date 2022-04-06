/* When changing page not from the pagination component the page 
itself will change but the style of the selected page item will not page 
so in order to back to page 1 when sorting and filtering i implement that function 
to fix that problem*/
export default function fixPaginationIssue(currentPage) {
  const paginationItems = document.querySelectorAll(".MuiPaginationItem-root");
  paginationItems.forEach((pagination) => {
    if (pagination.innerText == currentPage) {
      pagination.classList.add("Mui-selected");
      pagination.ariaCurrent = "true";
      pagination.ariaLabel = `page ${currentPage}`;
    } else {
      pagination.classList.remove("Mui-selected");
      pagination.ariaCurrent = "false";
      pagination.ariaLabel = `Go to page ${currentPage}`;
    }
  });
}
