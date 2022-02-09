import React, { useState, useEffect, useLayoutEffect } from "react";
import sprite from "../icons/sprite.svg";
import useStyles, { animations } from "./styles/products";
import { useProductsStore } from "./../store";
import { useTheme } from "@mui/styles";
import getPaginatedProducts from "../Utils/getPaginatedProducts";

import Product from "./common/Product";

import { Masonry } from "@mui/lab";
import { motion } from "framer-motion";
import { CircularProgress, Pagination } from "@mui/material";

const Products = () => {
  const products = useProductsStore((state) => state.products);
  const updateProducts = useProductsStore((state) => state.updateProducts);
  const [productAnimationState, setProductAnimationState] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  //pagination
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const pages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = getPaginatedProducts(
    products,
    page,
    productsPerPage
  );
  const handlePageChange = (event, page) => {
    setPage(page);
  };
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useEffect(() => {
    setProductAnimationState(true);
  }, [page === 1]);

  useEffect(() => {
    updateProducts(productsPerPage);
  }, []);

  return (
    <>
      {Array.isArray(products) ? (
        <>
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
            {paginatedProducts.map((product) => (
              <motion.li
                key={product.id}
                variants={productAnimationState ? animations.product : ""}
              >
                <Product product={product}></Product>
              </motion.li>
            ))}
          </Masonry>
          <Pagination
            count={pages}
            page={page}
            color="primary"
            hidePrevButton={true}
            hideNextButton={true}
            className={classes.pagination}
            onChange={handlePageChange}
          />
        </>
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
