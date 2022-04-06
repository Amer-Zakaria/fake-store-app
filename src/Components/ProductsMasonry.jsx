import React from "react";
import useStyles, { animations } from "./styles/products";
import { useTheme } from "@mui/styles";
import { motion } from "framer-motion";

import Product from "./Product";

import { Masonry } from "@mui/lab";

const ProductsMasonry = ({ products }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Masonry
      columns={{ xs: 1, sm: 2, lg: 3 }}
      component={motion.ul}
      variants={animations.products}
      initial={window.innerWidth >= theme.breakpoints.values.sm ? "hidden" : ""}
      animate="visible"
      className={classes.masonry}
    >
      {products.map((product) => (
        <motion.li key={product.id} variants={animations.product}>
          <Product product={product}></Product>
        </motion.li>
      ))}
    </Masonry>
  );
};

export default ProductsMasonry;
