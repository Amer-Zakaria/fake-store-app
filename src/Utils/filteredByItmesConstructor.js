export default function filteredByItemsConstructor(filters) {
  let filteredByItems = [];

  //price
  let isPriceFilterChanged = false;
  const { defaultPrices, priceFilter } = filters.price;
  for (const index in defaultPrices) {
    if (defaultPrices[index] !== priceFilter[index]) {
      isPriceFilterChanged = true;
      break;
    }
  }
  if (isPriceFilterChanged)
    filteredByItems.push({
      filterKey: "price",
      ui: `$${priceFilter[0]} - $${priceFilter[1]}`,
    });
  // Categories
  let selectedCategories = findCheckedCheckboxes(
    "categories",
    filters.categories
  );
  if (selectedCategories.length > 0) {
    filteredByItems = filteredByItems.concat(selectedCategories);
  }
  //specialProducts
  let selectedSpecialProducts = findCheckedCheckboxes(
    "specialProducts",
    filters.specialProducts
  );
  if (selectedSpecialProducts.length > 0) {
    filteredByItems = filteredByItems.concat(selectedSpecialProducts);
  }
  //rates
  let selectedRates = findCheckedCheckboxes("rates", filters.rates);
  if (selectedRates.length > 0) {
    filteredByItems = filteredByItems.concat(selectedRates);
  }
  //filter by name
  if (filters.filterByName.length > 0) {
    filteredByItems.push({
      filterKey: "filterByName",
      ui: `"${filters.filterByName}"`,
    });
  }

  return filteredByItems;
}

function findCheckedCheckboxes(filterKey, checkboxesGroup) {
  const selectedCheckboxes = checkboxesGroup
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => ({
      filterKey,
      ui: checkbox.displayName,
    }));

  return selectedCheckboxes;
}
