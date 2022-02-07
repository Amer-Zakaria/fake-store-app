import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "react-toastify";
import { getProducts, getImage } from "./Services/productsService";

let productsStore = (set) => ({
  products: "fetching",
  specialProducts: [],

  updateProducts: async () => {
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
          .map((product) => getImage(product.image.slice(24)))
          .map((imagePromise) => imagePromise.catch((e) => "error"))
      ).then((blobImages) => {
        for (let index in products) {
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
});
//save special products in local storage
productsStore = persist(productsStore, {
  name: "special-products",
  partialize: (state) => ({ specialProducts: state.specialProducts }),
});

productsStore = devtools(productsStore);

export const useProductsStore = create(productsStore);
