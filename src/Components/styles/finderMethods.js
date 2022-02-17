import { makeStyles } from "@mui/styles";

export default makeStyles({
  container: {
    borderBottom: "0.0001px solid #999",
    display: "flex",
    justifyContent: "space-around",
    maxWidth: 840,
    margin: "0 auto",
  },
  methodButton: {
    fontSize: "20px",
    padding: 10,
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
});
