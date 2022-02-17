import React from "react";
import { IconButton } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import Sort from "@mui/icons-material/Sort";
import { Divider } from "@mui/material";
import useStyles from "./styles/finderMethods";

const FinderMethods = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <IconButton className={classes.methodButton}>
        <SearchIcon className={classes.searchIcon} />
        Search
      </IconButton>
      <Divider orientation="vertical" flexItem variant="middle" />
      <IconButton className={classes.methodButton}>
        <FilterAltIcon className={classes.filterIcon} />
        Filter
      </IconButton>
      <Divider orientation="vertical" flexItem variant="middle" />
      <IconButton className={classes.methodButton}>
        <Sort className={classes.sortIcon} />
        Sort
      </IconButton>
    </div>
  );
};

export default FinderMethods;
