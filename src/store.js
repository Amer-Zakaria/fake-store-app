import create from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "react-toastify";
import { getProducts, getImage } from "./Services/productsService";

let productsStore = (set) => ({
  products: "fetching",

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
        product.isAdded = false;
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
        set({ products: products });
      });
    }
  },

  addProductToCart: (id) =>
    set((state) => ({
      products: state.products.map((product) => {
        if (product.id === id) {
          product.isCart = !product.isCart;
          if (product.isCart) {
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
          return product;
        }
        return product;
      }),
    })),

  addProductToFavorite: (id) =>
    set((state) => ({
      products: state.products.map((product) => {
        if (product.id === id) {
          product.isFavorite = !product.isFavorite;
          if (product.isFavorite) {
            toast.success("Product added to favorites", {
              position: "bottom-right",
              autoClose: 3000,
            });
          } else {
            toast("Product removed from favorites", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: true,
            });
          }
          return product;
        }
        return product;
      }),
    })),
});

productsStore = devtools(productsStore);

export const useProductsStore = create(productsStore);
