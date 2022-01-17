import { makeStyles } from "@mui/styles";

export default makeStyles({
  cardMediaContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardLoader: (isImageLoadded) => ({
    display: isImageLoadded ? "none" : "block",
    position: "absolute",
  }),
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
  cardHover: {
    boxShadow: "0px 0px 15px 5px rgba(196,196,196, 0.5)",
  },
  cardMoreHover: { scale: 1.1 },
};
