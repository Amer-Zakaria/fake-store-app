import React from "react";
import sprite from "../../icons/sprite.svg";
import useStyles from "../styles/TwoActionIcons.js";

import { SvgIcon, Divider, createSvgIcon, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TwoActionIcons = (props) => {
  const classes = useStyles();
  const { onAdd, isAdded, isFavorite, onFavorite } = props;
  return (
    <div className={classes.iconContainer}>
      <IconButton onClick={() => onFavorite(isFavorite)}>
        <SvgIcon
          fontSize="large"
          className={classes.icon}
          component={isFavorite ? FavoriteIcon : FavoriteBorderOutlinedIcon}
        />
      </IconButton>
      <Divider variant="middle" orientation="vertical" flexItem />
      <IconButton onClick={() => onAdd(isAdded)}>
        <SvgIcon fontSize="large" className={classes.icon}>
          {isAdded ? (
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
