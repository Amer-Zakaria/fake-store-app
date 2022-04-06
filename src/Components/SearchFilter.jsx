import React, { useState, useEffect } from "react";
import useStyles from "./styles/finderMethods";
import { useProductsStore } from "./../store";

import {
  Button,
  Hidden,
  ClickAwayListener,
  TextField,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

const SearchFilter = () => {
  const classes = useStyles();
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterByName, setFilterByName] = useState("");
  const updateFilterByName = useProductsStore(
    (state) => state.updateFilterByName
  );
  const filters = useProductsStore((state) => state.filters);

  useEffect(() => {
    setFilterByName(filters.filterByName);
  }, [filters.filterByName]);

  return (
    <>
      {/* On Mobile */}
      <Hidden mdUp>
        <ClickAwayListener onClickAway={() => setSearchOpen(false)}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setSearchOpen(false)}
              open={searchOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    label="Filter By Name"
                    variant="outlined"
                    className={classes.mobileSearchInput}
                    value={filterByName}
                    onChange={(e) => setFilterByName(e.target.value)}
                  />
                  <Button
                    className={classes.searchCheckButton}
                    variant="contained"
                    onClick={() => {
                      setSearchOpen(false);
                      updateFilterByName(filterByName);
                    }}
                  >
                    <CheckOutlinedIcon />
                  </Button>
                </>
              }
              arrow
              classes={{
                arrow: classes.searchTooltipArrow,
                tooltip: classes.searchTooltip,
              }}
            >
              <Button
                onClick={() => setSearchOpen(!searchOpen)}
                className={classes.methodButton}
              >
                <SearchIcon className={classes.searchIcon} />
                Search
              </Button>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </Hidden>
      {/* On Desktop */}
      <Hidden mdDown>
        <TextField
          size="small"
          id="outlined-basic"
          label="Filter By Name"
          variant="outlined"
          className={classes.desktopSearchInput}
          value={filterByName}
          onChange={(e) => updateFilterByName(e.target.value)}
        />
      </Hidden>
    </>
  );
};

export default SearchFilter;
