import React from "react";
import useStyles from "./styles/finderMethods";

import { Divider, Hidden } from "@mui/material";

import Filter from "./Filter";
import Sort from "./Sort";

const FinderMethods = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Filter />
      <Hidden mdUp>
        <Divider orientation="vertical" flexItem variant="middle" />
      </Hidden>
      <Sort />
    </div>
  );
};

export default FinderMethods;
