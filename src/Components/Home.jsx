import React, { useState, useEffect, useLayoutEffect } from "react";
import sprite from "../icons/sprite.svg";
import useStyles from "./styles/products";
import { useProductsStore } from "../store";
import getPaginatedProducts from "../Utils/getPaginatedProducts";

import ProductsMasonry from "./ProductsMasonry";

import { CircularProgress, Pagination } from "@mui/material";

const Products = () => {
  const products = useProductsStore((state) => state.products);
  const updateProducts = useProductsStore((state) => state.updateProducts);
  const classes = useStyles();

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
    updateProducts(productsPerPage);
  }, []);

  return (
    <>
      {Array.isArray(products) ? (
        <>
          <ProductsMasonry products={paginatedProducts} />
          <Pagination
            count={pages}
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
