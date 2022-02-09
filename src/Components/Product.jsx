import React, { useState } from "react";
import useStyles, { animations } from "./styles/product";
import imageError from "../images/image-error.png";
import { motion } from "framer-motion";

import TwoActionIcons from "./TwoActionIcons";

import {
  Rating,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Product = ({ product }) => {
  const [isImageLoadded, setIsImageLoadded] = useState(false);
  const classes = useStyles(isImageLoadded);

  return (
    <>
      <Card
        variants={animations.card}
        whileHover={"hover"}
        component={motion.div}
        className={classes.card}
      >
        <div className={classes.cardMediaContainer}>
          <CardMedia
            className={classes.cardMedia}
            component={"img"}
            alt={product.category}
            image={product.image === "error" ? imageError : product.image}
            loading="lazy"
            onLoad={() => {
              setIsImageLoadded(true);
            }}
          />
        </div>
        <TwoActionIcons product={product} />
        <CardContent className={classes.cardContent}>
          <Typography variant="body" color="text.primary">
            {product.title}
          </Typography>
          <Typography
            className={classes.cardPrice}
            variant="body"
            color="primary"
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
        <CardActions className={classes.cardAction}>
          <Typography
            className={classes.cardMore}
            variant="body2"
            color="text.secondary"
            component={motion.div}
            variants={animations.cardMore}
            whileHover={"hover"}
            whileTap={"hover"}
          >
            Tap for more info
          </Typography>
        </CardActions>
      </Card>
    </>
  );
};

export default Product;
