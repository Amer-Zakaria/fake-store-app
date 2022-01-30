import create from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "react-toastify";

let productsStore = (set) => ({
  products: "fetching",

  updateProducts: (products) => set((state) => ({ products: products })),

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
