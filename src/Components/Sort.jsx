import React, { useState } from "react";
import useStyles from "./styles/finderMethods";

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import CheckIcon from "@mui/icons-material/Check";
import { useProductsStore } from "./../store";

const Sort = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const sortProductAsc = useProductsStore((state) => state.sortPriceAsc);
  const sortProductDesc = useProductsStore((state) => state.sortPriceDesc);
  const sortBestRate = useProductsStore((state) => state.sortBestRate);
  const sortA_Z = useProductsStore((state) => state.sortA_Z);
  const sortMethodsArray = [
    {
      name: "Price (low to high)",
      isActive: false,
      clickHandler(name) {
        handleChoose(name, sortProductAsc);
      },
    },
    {
      name: "Price (high to low)",
      isActive: false,
      clickHandler(name) {
        handleChoose(name, sortProductDesc);
      },
    },
    {
      name: "Best rate",
      isActive: false,
      clickHandler(name) {
        handleChoose(name, sortBestRate);
      },
    },
    {
      name: "A_Z",
      isActive: false,
      clickHandler(name) {
        handleChoose(name, sortA_Z);
      },
    },
  ];
  const [sortMethods, setSortMethods] = useState(sortMethodsArray);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleChoose(name, sortProductsHandler) {
    setAnchorEl(null);
    sortProductsHandler();
    setSortMethods((oldSortMethods) => {
      const newSortMethods = [...oldSortMethods];
      return newSortMethods.map((sortMethod) => {
        if (sortMethod.name === name) {
          sortMethod.isActive = true;
          return sortMethod;
        }
        sortMethod.isActive = false;
        return sortMethod;
      });
    });
  }

  return (
    <>
      <IconButton onClick={handleOpen} className={classes.methodButton}>
        <SortIcon className={classes.sortIcon} />
        Sort
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {sortMethods.map((sortMethod) => (
          <MenuItem
            sx={{ padding: "6px 10px" }}
            onClick={() => sortMethod.clickHandler(sortMethod.name)}
            key={sortMethod.name}
          >
            {sortMethod.isActive ? (
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
            ) : (
              ""
            )}
            <ListItemText inset={!sortMethod.isActive}>
              {sortMethod.name}
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Sort;
