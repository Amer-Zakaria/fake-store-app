import React, { createContext, useEffect, useReducer } from "react";
import { getProducts, getImage } from "../Services/productsService";
import { toast } from "react-toastify";

export const ProductsContext = createContext();
ProductsContext.displayName = "ProductsContext";

export const ACTION = {
  PRODUCTS: "products",
  ERROR: "error",
  FAVORITE: "favorite",
  ADD: "add",
};

function productsReducer(products, action) {
  if (action.type === ACTION.PRODUCTS) {
    return action.payload;
  } else if (action.type === ACTION.ERROR) {
    return "error";
  } else if (action.type === ACTION.FAVORITE) {
    return products.map((product) => {
      if (product.id === action.payload.id) {
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
    });
  } else if (action.type === ACTION.ADD) {
    return products.map((product) => {
      if (product.id === action.payload.id) {
        product.isAdded = !product.isAdded;
        if (product.isAdded) {
          toast.success("Product added to cart", {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          toast("Product removed from cart", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
        return product;
      }
      return product;
    });
  }
  return products;
}

const ProductsProvider = ({ children }) => {
  const [products, updateProducts] = useReducer(productsReducer, "fetching");

  async function fetchProducts() {
    const products = await getProducts().catch((error) => {
      if (!error.isExpectedError) {
        toast.error("An UnExpected Error Occurred!");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      updateProducts({ type: ACTION.ERROR });
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
        updateProducts({
          type: ACTION.PRODUCTS,
          payload: products,
        });
      });
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, updateProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;

//what if image from the images not fetched .map(imagePromise => imagePromise.catch((e) => error image src in product prespective)).then(...) put error image instead
