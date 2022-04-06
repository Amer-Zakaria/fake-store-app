import React, { useRef, useEffect } from "react";
import useStyles from "./styles/filteredBy";
import { useProductsStore } from "./../store";
import filteredByItemsConstructor from "../Utils/filteredByItmesConstructor";

import { Typography, Chip } from "@mui/material";

const FilteredBy = () => {
  const classes = useStyles();
  const filters = useProductsStore((state) => state.filters);
  const filteredByItems = filteredByItemsConstructor(filters);
  const updateCheckboxGroup = useProductsStore(
    (state) => state.updateCheckboxGroup
  );
  const resetPriceFilter = useProductsStore((state) => state.resetPriceFilter);
  const updateFilterByName = useProductsStore(
    (state) => state.updateFilterByName
  );

  const handleDeleteChip = (filterKey, chipDisplayName) => {
    if (filterKey === "price") resetPriceFilter();
    else if (filterKey === "filterByName") updateFilterByName("");
    else updateCheckboxGroup(filterKey, chipDisplayName);
  };

  return (
    <>
      {filteredByItems.length > 0 ? (
        <div className={classes.container}>
          <Typography
            variant="body"
            component="body"
            className={classes.title}
            color="#666"
          >
            Filtered by:
          </Typography>
          {filteredByItems.map((filteredByItem) => (
            <Chip
              key={filteredByItem.ui}
              variant="outlined"
              label={filteredByItem.ui}
              className={classes.filteredByItem}
              onDelete={() =>
                handleDeleteChip(filteredByItem.filterKey, filteredByItem.ui)
              }
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default FilteredBy;
