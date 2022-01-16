import { makeStyles } from "@mui/styles";

export default makeStyles({
  card: {
    width: 200,
    margin: "20px auto",
    padding: "20px 10px 10px",
    borderRadius: "20px !important",
    position: "relative",
  },
  cardMediaContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardMedia: {
    opacity: 0,
    transition: "all 0.5s",
  },
  cardLoader: (isImageLoadded) => ({
    display: isImageLoadded ? "none" : "block",
    position: "absolute",
  }),
  cardContent: {
    padding: "0 !important",
    margin: "5px 0px",
    overflowWrap: "break-word;",
  },
  cardPrice: {
    marginTop: "5px !important",
  },
  cardRating: {
    marginTop: "2px",
  },
  cardAction: {
    display: "block !important",
    padding: "0 !important",
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
