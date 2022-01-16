import React from "react";
import sprite from "../../icons/sprite.svg";
import useStyles from "../styles/TwoActionIcons.js";

import { SvgIcon, Divider, createSvgIcon, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CartAddIcon = createSvgIcon(
  <use href={sprite + "#cart-plus"}></use>,
  "cart Add"
);

const CartCheckIcon = createSvgIcon(
  <use href={sprite + "#cart-check"}></use>,
  "cart check"
);

const TwoActionIcons = (props) => {
  const classes = useStyles();
  const { onAdd, isAdded, isFavorite, onFavorite } = props;
  return (
    <div className={classes.iconContainer}>
      <IconButton>
        <SvgIcon
          className={classes.icon}
          onClick={() => onFavorite(isFavorite)}
          component={isFavorite ? FavoriteIcon : FavoriteBorderOutlinedIcon}
          fontSize="large"
        />
      </IconButton>
      <Divider variant="middle" orientation="vertical" flexItem />
      <IconButton>
        <SvgIcon
          className={classes.icon}
          fontSize="large"
          onClick={() => onAdd(isAdded)}
          component={isAdded ? CartCheckIcon : CartAddIcon}
        />
      </IconButton>
    </div>
  );
};

export default TwoActionIcons;
