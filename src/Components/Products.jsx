import React, { useContext } from "react";
import { ProductsContext } from "./../Providers/ProductsProvider";
import Product from "./common/Product";
import useStyles, { animations } from "./styles/products";
import sprite from "../icons/sprite.svg";

import { Masonry } from "@mui/lab";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const Products = () => {
  const classes = useStyles();
  const { products, updateProducts } = useContext(ProductsContext);

  return (
    <>
      {Array.isArray(products) ? (
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3 }}
          component={motion.ul}
          variants={animations.products}
          initial="hidden"
          animate="visible"
          className={classes.masonry}
          style={{ listStyle: "none", padding: "0 40px", margin: "0 auto" }}
        >
          {products.map((product) => (
            <motion.li key={product.id} variants={animations.product}>
              <Product
                product={product}
                updateProducts={updateProducts}
              ></Product>
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
