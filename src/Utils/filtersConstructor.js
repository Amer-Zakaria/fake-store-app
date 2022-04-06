import { Rating } from "@mui/material";

//Get the Products then Construct a filter based on them
export function filtersConstructor(products) {
  const filters = {};

  //Price
  filters.price = {
    defaultPrices: [
      Math.floor(maxminFinder("min", products)),
      Math.ceil(maxminFinder("max", products)),
    ],
    priceFilter: [
      Math.floor(maxminFinder("min", products)),
      Math.ceil(maxminFinder("max", products)),
    ],
  };

  //Rate
  const ratesDuplicated = products.map((product) => {
    return Math.round(product.rating.rate);
  });
  const rates = [];
  for (let i = 0; i <= 5; i++) {
    if (ratesDuplicated.indexOf(i) >= 0) rates.push(i);
  }
  filters.rates = rates.map((rate) => {
    return {
      rateNumber: rate,
      displayName: `${rate} Stars`,
      checked: false,
      CheckboxLabelIcon: <Rating value={rate} readOnly />,
    };
  });

  //category
  const categoriesDubplicated = products.map((product) => {
    return product.category;
  });
  const categories = categoriesDubplicated
    .filter((category, index) => category !== categoriesDubplicated[index - 1])
    .map((category) => {
      return { displayName: category, checked: false };
    });
  filters.categories = categories;

  //special products
  filters.specialProducts = [
    { displayName: "Favorite", checked: false, booleanKey: "isFavorite" },
    { displayName: "Cart", checked: false, booleanKey: "isCart" },
  ];

  filters.filterByName = "";

  return filters;
}

function maxminFinder(kind, array) {
  if (kind === "min") {
    return Math.min.apply(
      Math,
      array.map(function (o) {
        return o.price;
      })
    );
  }
  return Math.max.apply(
    Math,
    array.map(function (o) {
      return o.price;
    })
  );
}
