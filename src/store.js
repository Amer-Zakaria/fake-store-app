import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { getProducts, getImage } from "./Services/productsService";
import { filtersConstructor } from "./Utils/filtersConstructor";

let productsStore = (set, get) => ({
  products: "fetching",
  specialProducts: [],
  filters: [],
  page: 1,
  filterDrawer: { isOpened: false, width: "270px" },

  updateProducts: async (productsPerPage) => {
    const products = await getProducts().catch((error) => {
      if (!error.isExpectedError) {
        toast.error("An UnExpected Error Occurred!");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      set({ products: "error" });
    });

    if (Array.isArray(products)) {
      for (let product of products) {
        product.isCart = false;
        product.isFavorite = false;
      }
      //fetching images manually
      Promise.all(
        products
          .slice(0, productsPerPage)
          .map((product) => getImage(product.image.slice(24)))
          .map((imagePromise) => imagePromise.catch((e) => "error"))
      ).then((blobImages) => {
        for (let index in products.slice(0, productsPerPage)) {
          if (blobImages[index] === "error") products[index].image = "error";
          else products[index].image = URL.createObjectURL(blobImages[index]);
        }
        set((state) => ({
          products: products.map((product) => {
            const specialProduct = state.specialProducts.find(
              (specialProduct) => specialProduct.id === product.id
            );
            if (specialProduct) {
              product.isCart = specialProduct.isCart;
              product.isFavorite = specialProduct.isFavorite;
              return product;
            }
            return product;
          }),
          filters: filtersConstructor(products),
        }));
      });
    }
  },

  addProductToCart: (modifiedProduct) => {
    modifiedProduct.isCart = !modifiedProduct.isCart;

    set((state) => ({
      products: getNewProducts(state.products),
      specialProducts: getSpecialProducts(state.specialProducts),
    }));

    function getNewProducts(products) {
      return products.map((product) => {
        if (product.id === modifiedProduct.id) {
          return modifiedProduct;
        }
        return product;
      });
    }

    function getSpecialProducts(specialProducts) {
      if (modifiedProduct.isCart) {
        toast.success("Product added to Cart", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast("Product removed from Cart", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }

      const isModifedProductExistInSpecialProducts = specialProducts.some(
        (specialProduct) => specialProduct.id === modifiedProduct.id
      );
      const newSpecialProducts = specialProducts.map((specialProduct) => {
        if (specialProduct.id === modifiedProduct.id) {
          return modifiedProduct;
        }
        return specialProduct;
      });
      //if the modified product in special products
      if (isModifedProductExistInSpecialProducts) {
        if (
          modifiedProduct.isCart === false &&
          modifiedProduct.isFavorite === false
        ) {
          return newSpecialProducts.filter(
            (specialProduct) => specialProduct.id !== modifiedProduct.id
          );
        }
        return newSpecialProducts;
      }
      //if the modified product not exist in special products
      newSpecialProducts.push(modifiedProduct);
      return newSpecialProducts;
    }
  },

  addProductToFavorite: (modifiedProduct) => {
    modifiedProduct.isFavorite = !modifiedProduct.isFavorite;

    set((state) => ({
      products: getNewProducts(state.products),
      specialProducts: getSpecialProducts(state.specialProducts),
    }));

    function getNewProducts(products) {
      return products.map((product) => {
        if (product.id === modifiedProduct.id) {
          return modifiedProduct;
        }
        return product;
      });
    }

    function getSpecialProducts(specialProducts) {
      if (modifiedProduct.isFavorite) {
        toast.success("Product added to Favorite", {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast("Product removed from Favorite", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }

      const isModifedProductExistInSpecialProducts = specialProducts.some(
        (specialProduct) => specialProduct.id === modifiedProduct.id
      );
      const newSpecialProducts = specialProducts.map((specialProduct) => {
        if (specialProduct.id === modifiedProduct.id) {
          return modifiedProduct;
        }
        return specialProduct;
      });
      //if the modified product in special products
      if (isModifedProductExistInSpecialProducts) {
        if (
          modifiedProduct.isCart === false &&
          modifiedProduct.isFavorite === false
        ) {
          return newSpecialProducts.filter(
            (specialProduct) => specialProduct.id !== modifiedProduct.id
          );
        }
        return newSpecialProducts;
      }
      //if the modified product not exist in special products
      newSpecialProducts.push(modifiedProduct);
      return newSpecialProducts;
    }
  },

  /* Sort */
  sortPriceAsc: () => {
    set((state) => {
      let newProducts = [...state.products];
      newProducts = newProducts.sort(
        (firstProduct, secondProduct) =>
          firstProduct.price - secondProduct.price
      );
      return {
        products: newProducts,
      };
    });
  },

  sortPriceDesc: () => {
    set((state) => {
      let newProducts = [...state.products];
      newProducts = newProducts.sort(
        (firstProduct, secondProduct) =>
          secondProduct.price - firstProduct.price
      );
      return {
        products: newProducts,
      };
    });
  },

  sortBestRate: () => {
    set((state) => {
      let newProducts = [...state.products];
      newProducts = newProducts.sort(
        (firstProduct, secondProduct) =>
          secondProduct.rating.rate - firstProduct.rating.rate
      );
      return {
        products: newProducts,
      };
    });
  },

  sortA_Z: () => {
    set((state) => {
      let newProducts = [...state.products];
      newProducts = newProducts.sort((firstProduct, secondProduct) => {
        return firstProduct.title[0].toLowerCase() >
          secondProduct.title[0].toLowerCase()
          ? 1
          : -1;
      });

      return {
        products: newProducts,
      };
    });
  },

  /* Filters */
  getFilteredProducts: () => {
    let productsFiltered = get().products;
    const filters = get().filters;

    if (Array.isArray(productsFiltered)) {
      //Price
      productsFiltered = productsFiltered.filter(
        (product) =>
          product.price >= filters.price.priceFilter[0] &&
          product.price <= filters.price.priceFilter[1]
      );
      //Categorie
      const selectedCategories = filters.categories
        .filter((categorie) => categorie.checked)
        .map((categorie) => categorie.displayName);
      if (selectedCategories.length > 0) {
        productsFiltered = productsFiltered.filter((product) =>
          selectedCategories.some(
            (slectedCategorie) => slectedCategorie === product.category
          )
        );
      }
      //Special Products
      const selectedSpecialProducts = filters.specialProducts.filter(
        (specialProducts) => specialProducts.checked
      ); //selected checkboxes
      if (selectedSpecialProducts.length > 0) {
        productsFiltered = productsFiltered.filter((product) => {
          const productIsSpecialProduct = selectedSpecialProducts.some(
            (selectedSpecialProduct) =>
              selectedSpecialProduct.checked ===
              product[selectedSpecialProduct.booleanKey]
          );
          return productIsSpecialProduct;
        });
      }
      //Rate
      const selectedRates = filters.rates
        .filter((rate) => rate.checked)
        .map((rate) => rate.rateNumber);
      if (selectedRates.length > 0) {
        productsFiltered = productsFiltered.filter((product) =>
          selectedRates.some(
            (selectedRate) => selectedRate === Math.round(product.rating.rate)
          )
        );
      }
      //filter by name
      const filterByName = filters.filterByName;
      if (filterByName.length > 0) {
        productsFiltered = productsFiltered.filter(
          (product) =>
            product.title.slice(0, filterByName.trim().length).toLowerCase() ===
            filterByName.toLowerCase().trim()
        );
      }
    }

    return productsFiltered;
  },

  updatePriceFilter: (newPrice) => {
    set((state) => {
      const newFilters = { ...state.filters };
      newFilters.price.priceFilter = newPrice;
      return { filters: newFilters };
    });
  },

  updateCheckboxGroup: (groupName, checkboxName, makeAllFalse) =>
    set((state) => {
      const newFilters = { ...state.filters };
      newFilters[groupName] = newFilters[groupName].map((checkbox) => {
        if (makeAllFalse) {
          checkbox.checked = false;
          return checkbox;
        }
        if (checkbox.displayName === checkboxName) {
          checkbox.checked = !checkbox.checked;
          return checkbox;
        }
        return checkbox;
      });
      return { filters: newFilters };
    }),

  updateFilterDrawerStatus: (status) => {
    set((state) => ({ filterDrawer: { width: "270px", isOpened: status } }));
  },

  resetPriceFilter: () => {
    set((state) => {
      const newFilters = { ...state.filters };
      const defaultPrices = newFilters.price.defaultPrices;
      newFilters.price.priceFilter = defaultPrices;
      return { filters: newFilters };
    });
  },

  updateFilterByName: (filterByName) => {
    set((state) => {
      const newFilters = { ...state.filters };
      newFilters.filterByName = filterByName;
      return { filters: newFilters };
    });
  },

  /* page */
  updatePage: (page) => set(() => ({ page })),
});

//save special products in local storage
productsStore = persist(productsStore, {
  name: "special-products",
  partialize: (state) => ({ specialProducts: state.specialProducts }),
});

productsStore = devtools(productsStore);

export const useProductsStore = create(productsStore);
