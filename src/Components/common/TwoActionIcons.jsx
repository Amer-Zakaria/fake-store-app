import React from "react";
import sprite from "../../icons/sprite.svg";
import useStyles from "../styles/TwoActionIcons.js";

import { SvgIcon, Divider, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useProductsStore } from "./../../store";

const TwoActionIcons = ({ product: { id, isFavorite, isCart } }) => {
  const addProductsToCart = useProductsStore((state) => state.addProductToCart);
  const addProductsToFavorite = useProductsStore(
    (state) => state.addProductToFavorite
  );
  const classes = useStyles();

  return (
    <div className={classes.iconsContainer}>
      <IconButton
        onClick={() => addProductsToFavorite(id)}
        size="large"
        className={classes.iconButton}
      >
        <SvgIcon
          fontSize="large"
          className={classes.icon}
          component={isFavorite ? FavoriteIcon : FavoriteBorderOutlinedIcon}
        />
      </IconButton>
      <Divider variant="middle" orientation="vertical" flexItem />
      <IconButton
        onClick={() => addProductsToCart(id)}
        size="large"
        className={classes.iconButton}
      >
        <SvgIcon fontSize="large" className={classes.icon}>
          {isCart ? (
            <use href={sprite + "#cart-check"}></use>
          ) : (
            <use href={sprite + "#cart-plus"}></use>
          )}
        </SvgIcon>
      </IconButton>
    </div>
  );
};

export default TwoActionIcons;
