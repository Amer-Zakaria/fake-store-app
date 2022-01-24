import { makeStyles } from "@mui/styles";

export default makeStyles({
  cardMediaContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardPrice: {
    marginTop: "5px !important",
  },
  cardRating: {
    marginTop: "2px",
  },
  cardMore: {
    textAlign: "center",
    cursor: "pointer",
  },
});

export const animations = {
  card: {
    hover: { boxShadow: "0px 0px 15px 5px rgba(196,196,196, 0.5)" },
  },
  cardMore: {
    hover: { scale: 1.1 },
  },
};
