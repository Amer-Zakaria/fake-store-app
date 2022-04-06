import React, { useEffect, useState } from "react";
import useStyles from "./styles/finderMethods";
import { useProductsStore } from "./../store";

import { Divider, Drawer, Slider, Hidden, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

import Collabsible from "./common/Collapsible";
import CheckboxGroupWithAll from "./common/CheckboxGroupWithAll";
import SearchFilter from "./SearchFilter";

const Filter = () => {
  const classes = useStyles();
  const updateFilterDrawerStatus = useProductsStore(
    (state) => state.updateFilterDrawerStatus
  );

  return (
    <>
      <SearchFilter />
      <Hidden mdUp>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Button
          onClick={() => updateFilterDrawerStatus(true)}
          className={classes.methodButton}
        >
          <FilterAltIcon className={classes.filterIcon} />
          Filter
        </Button>
      </Hidden>
    </>
  );
};

export default Filter;

export function FilterDrawer() {
  const filters = useProductsStore((state) => state.filters);
  const classes = useStyles();
  const filterDrawerStatus = useProductsStore(
    (state) => state.filterDrawer
  ).isOpened;
  const updateFilterDrawerStatus = useProductsStore(
    (state) => state.updateFilterDrawerStatus
  );
  const updatePriceFilter = useProductsStore(
    (state) => state.updatePriceFilter
  );
  const [priceControler, setPriceControler] = useState(
    filters.price.defaultPrices
  );
  const updateCheckboxGroup = useProductsStore(
    (state) => state.updateCheckboxGroup
  );

  //so when reseting price Filter to it's default
  //state the price controler get updated too
  useEffect(() => {
    setPriceControler(filters.price.priceFilter);
  }, [filters.price.priceFilter]);

  function valueLabelFormat(value) {
    return `$${value}`;
  }

  return (
    <nav className={classes.drawer}>
      {/* Desktop */}
      <Hidden mdDown>
        <Drawer
          className={classes.drawerPaper}
          anchor="left"
          variant="permanent"
        >
          <Collabsible defaultExpanded={true} id={1} header={<p>Price</p>}>
            <Slider
              value={priceControler}
              onChange={(e, newValue) => {
                setPriceControler(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                updatePriceFilter(newValue);
              }}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={filters.price.defaultPrices[0]}
              max={filters.price.defaultPrices[1]}
              className={classes.filter}
              valueLabelFormat={valueLabelFormat}
              classes={{
                valueLabel: classes.priceLabel,
              }}
            />
          </Collabsible>
          <Collabsible defaultExpanded={true} id={2} header={<p>Categories</p>}>
            <CheckboxGroupWithAll
              checkboxGroupName="categories"
              checkboxGroup={filters.categories}
              updateCheckboxGroup={updateCheckboxGroup}
            />
          </Collabsible>
          <Collabsible id={3} header={<p>Special Products</p>}>
            <CheckboxGroupWithAll
              checkboxGroupName="specialProducts"
              checkboxGroup={filters.specialProducts}
              updateCheckboxGroup={updateCheckboxGroup}
            />
          </Collabsible>
          <Collabsible id={4} header={<p>Rates</p>}>
            <CheckboxGroupWithAll
              checkboxGroupName="rates"
              checkboxGroup={filters.rates}
              updateCheckboxGroup={updateCheckboxGroup}
            />
          </Collabsible>
        </Drawer>
      </Hidden>
      {/* Mobile */}
      <Hidden mdUp>
        {filterDrawerStatus ? (
          <CloseIcon
            className={classes.exitDrawer}
            onClick={() => updateFilterDrawerStatus(false)}
          >
            X
          </CloseIcon>
        ) : (
          ""
        )}
        <Drawer
          className={classes.drawerPaper}
          anchor="left"
          open={filterDrawerStatus}
          onClose={() => updateFilterDrawerStatus(false)}
          variant="temporary"
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Collabsible defaultExpanded={true} id={1} header={<p>Price</p>}>
            <Slider
              value={priceControler}
              onChange={(e, newValue) => {
                setPriceControler(newValue);
              }}
              onChangeCommitted={(e, newValue) => {
                updatePriceFilter(newValue);
              }}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={filters.price.defaultPrices[0]}
              max={filters.price.defaultPrices[1]}
              className={classes.filter}
              valueLabelFormat={valueLabelFormat}
              classes={{
                valueLabel: classes.priceLabel,
              }}
            />
          </Collabsible>
          <Collabsible defaultExpanded={true} id={2} header={<p>Categories</p>}>
            <CheckboxGroupWithAll
              checkboxGroupName="categories"
              checkboxGroup={filters.categories}
              updateCheckboxGroup={updateCheckboxGroup}
            />
          </Collabsible>
          <Collabsible
            defaultExpanded={true}
            id={3}
            header={<p>Special Products</p>}
          >
            <CheckboxGroupWithAll
              checkboxGroupName="specialProducts"
              checkboxGroup={filters.specialProducts}
              updateCheckboxGroup={updateCheckboxGroup}
            />
          </Collabsible>
          <Collabsible defaultExpanded={true} id={4} header={<p>Rates</p>}>
            <CheckboxGroupWithAll
              checkboxGroupName="rates"
              checkboxGroup={filters.rates}
              updateCheckboxGroup={updateCheckboxGroup}
            />
          </Collabsible>
        </Drawer>
      </Hidden>
    </nav>
  );
}
