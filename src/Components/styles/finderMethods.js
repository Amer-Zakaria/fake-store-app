import { grey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  container: {
    borderBottom: "0.0001px solid #999",
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 840,
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-between",
    },
  },
  methodButton: {
    fontSize: "16px",
    padding: 8,
    margin: "0 20px",
    [theme.breakpoints.down("md")]: {
      color: grey[700],
    },
  },
  methodIcon: {},
  searchButton: {},
  searchIcon: {
    fontSize: "25px",
  },
  filterButton: {},
  filterIcon: {
    fontSize: "25px",
  },
  sortButton: {},
  sortIcon: {
    fontSize: "25px",
    transform: "rotateY(180deg)",
  },
  filter: {
    width: "200px",
    margin: "0 20px",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: "270px",
      flexShrink: 0,
    },
  },
  priceLabel: {
    background: "transparent",
    color: "purple",
    transform: "translateY(-18px) !important",
  },
  exitDrawer: {
    position: "absolute",
    right: 5,
    top: 8,
    color: "white",
    fontSize: "35px",
    zIndex: 9999,
    cursor: "pointer",
  },
  searchTooltip: {
    backgroundColor: "white",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    width: "90vw",
    maxWidth: 400,
    padding: 15,
    marginLeft: 20,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    marginTop: "10px !important",
  },
  searchTooltipArrow: {
    color: "white",
  },
  mobileSearchInput: {
    width: "100%",
  },
  desktopSearchInput: {
    width: "100%",
    maxWidth: 450,
    margin: "15px 25px",
  },
  searchCheckButton: {
    margin: "0 10px",
    minWidth: 40,
    height: 35,
  },
}));
