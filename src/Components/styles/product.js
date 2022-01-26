import { makeStyles } from "@mui/styles";

export default makeStyles({
  card: {
    margin: "20px 15px",
    padding: "20px 10px 10px",
    borderRadius: "20px",
    position: "relative",
  },
  cardMediaContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardContent: {
    padding: "0",
    margin: "5px 0px",
    overflowWrap: "break-word;",
  },
  cardPrice: {
    marginTop: "5px",
  },
  cardRating: {
    marginTop: "2px",
  },
  cardAction: {
    display: "block",
    padding: "0",
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
