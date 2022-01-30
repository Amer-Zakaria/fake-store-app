import React, { useEffect } from "react";
import sprite from "../icons/sprite.svg";
import useStyles, { animations } from "./styles/products";
import { getProducts, getImage } from "../Services/productsService";
import { toast } from "react-toastify";
import { useProductsStore } from "./../store";
import { useTheme } from "@mui/styles";

import Product from "./common/Product";

import { Masonry } from "@mui/lab";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const Products = () => {
  const products = useProductsStore((state) => state.products);
  const updateProducts = useProductsStore((state) => state.updateProducts);
  const classes = useStyles();
  const theme = useTheme();

  async function fetchProducts() {
    const products = await getProducts().catch((error) => {
      if (!error.isExpectedError) {
        toast.error("An UnExpected Error Occurred!");
      } else {
        toast.error(`Error: ${error.message}`);
      }
      updateProducts("error");
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
        updateProducts(products);
      });
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {Array.isArray(products) ? (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          component={motion.ul}
          variants={animations.products}
          initial={
            window.innerWidth >= theme.breakpoints.values.sm ? "hidden" : ""
          }
          animate="visible"
          className={classes.masonry}
        >
          {products.map((product) => (
            <motion.li key={product.id} variants={animations.product}>
              <Product product={product}></Product>
            </motion.li>
          ))}
        </Masonry>
      ) : (
        <div className={classes.notFetchedContainer}>
          {products === "fetching" ? (
            <CircularProgress color="primary" />
          ) : (
            <svg className={classes.productsError}>
              <use href={sprite + "#products-error"}></use>
            </svg>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
