import React, { useRef, useState } from "react";
import TwoActionIcons from "./common/TwoActionIcons";
import useStyles, { animations } from "./styles/product";
import { motion } from "framer-motion";

import {
  Rating,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

const Product = () => {
  const img = useRef();
  const [product, setProduct] = useState({
    id: 1,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: {
      rate: 3.74,
      count: 120,
    },
    isAdded: false,
    isFavorite: false,
    isImageLoadded: false,
  });

  function handleAdd(isAdded) {
    const newProduct = { ...product };
    newProduct.isAdded = !isAdded;
    setProduct(newProduct);
  }

  function handleFavorite(isFavorite) {
    const newProduct = { ...product };
    newProduct.isFavorite = !isFavorite;
    setProduct(newProduct);
  }

  function handleImageLoad() {
    const newProduct = { ...product };
    newProduct.isImageLoadded = true;
    img.current.style.opacity = 1;
    setProduct(newProduct);
  }

  const classes = useStyles(product.isImageLoadded);
  return (
    <Card component={motion.div} variants={animations} whileHover="cardHover">
      <div className={classes.cardMediaContainer}>
        <CardMedia
          ref={img}
          onLoad={handleImageLoad}
          component="img"
          image={product.image}
          alt={product.category}
        />
        <Box className={classes.cardLoader}>
          <CircularProgress color="secondary" />
        </Box>
      </div>

      <TwoActionIcons
        isFavorite={product.isFavorite}
        onFavorite={handleFavorite}
        onAdd={handleAdd}
        isAdded={product.isAdded}
      />
      <CardContent>
        <Typography variant="body" color="text.primary">
          {product.title}
        </Typography>
        <Typography
          className={classes.cardPrice}
          variant="body"
          color="secondary"
          fontSize="large"
          component={"div"}
        >
          {product.price}$
        </Typography>
        <Rating
          name="half-rating-read"
          precision={0.5}
          value={product.rating.rate}
          readOnly
          size="small"
          className={classes.cardRating}
        />
      </CardContent>
      <CardActions>
        <Typography
          className={classes.cardMore}
          variant="body2"
          color="text.secondary"
          component={motion.div}
          variants={animations}
          whileHover="cardMoreHover"
          whileTap="cardMoreHover"
        >
          Tap for more info
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Product;
