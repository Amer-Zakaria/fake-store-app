import React, { useEffect, useLayoutEffect } from "react";
import sprite from "../icons/sprite.svg";
import useStyles from "./styles/products";
import { useProductsStore } from "../store";
import getPaginatedProducts from "../Utils/getPaginatedProducts";
import fixPaginationIssue from "../Utils/fixPaginationIssue";

import ProductsMasonry from "./ProductsMasonry";
import Finder from "./Finder";
import { FilterDrawer } from "./Filter";

import { CircularProgress, Drawer, Pagination } from "@mui/material";

const Products = () => {
  const products = useProductsStore((state) => state.getFilteredProducts)();
  //listener to update products
  const listenToChangesOfProducts = useProductsStore((state) => state.products);
  const listenToChangesOfFilters = useProductsStore((state) => state.filters);
  const updateProducts = useProductsStore((state) => state.updateProducts);
  const classes = useStyles();
  const filterDrawerWidth = useProductsStore(
    (state) => state.filterDrawer
  ).width;

  //pagination
  const page = useProductsStore((state) => state.page);
  const updatePage = useProductsStore((state) => state.updatePage);
  const productsPerPage = 6;
  const pages = Math.ceil(products.length / productsPerPage);
  const paginatedProducts = getPaginatedProducts(
    products,
    page,
    productsPerPage
  );
  function handlePageChange(e, currentPage) {
    updatePage(currentPage);
    fixPaginationIssue(currentPage);
  }
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  useLayoutEffect(() => {
    handlePageChange(null, 1);
  }, [listenToChangesOfFilters]);

  useEffect(() => {
    updateProducts(productsPerPage);
  }, []);

  return (
    <>
      {Array.isArray(products) ? (
        <div style={{ display: "flex" }}>
          <FilterDrawer />
          <div className={classes.rightSide}>
            <Finder />
            <ProductsMasonry products={paginatedProducts} />
            {pages > 1 ? (
              <Pagination
                count={pages}
                color="primary"
                hidePrevButton={true}
                hideNextButton={true}
                className={classes.pagination}
                onChange={handlePageChange}
              />
            ) : (
              ""
            )}
          </div>
        </div>
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
