import React from "react";
import useStyles from "./styles/filteredBy";

import { Typography } from "@mui/material";

const FilteredBy = () => {
  const classes = useStyles();

  return (
    <Typography
      variant="h6"
      component="body"
      className={classes.container}
      color="#666"
    >
      Filtered by:{" "}
      <Typography variant="body2" className={classes.items}>
        Nothing
      </Typography>
    </Typography>
  );
};

export default FilteredBy;
