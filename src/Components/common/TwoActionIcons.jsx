import React from "react";
import sprite from "../../icons/sprite.svg";
import useStyles from "../styles/TwoActionIcons.js";
import { ACTION } from "../../Providers/ProductsProvider";

import { SvgIcon, Divider, IconButton } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TwoActionIcons = ({
  updateProducts,
  product: { id, isFavorite, isAdded },
}) => {
  const classes = useStyles();
  return (
    <div className={classes.iconsContainer}>
      <IconButton
        onClick={() =>
          updateProducts({ type: ACTION.FAVORITE, payload: { id } })
        }
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
        onClick={() => updateProducts({ type: ACTION.ADD, payload: { id } })}
        size="large"
        className={classes.iconButton}
      >
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
