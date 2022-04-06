import { makeStyles } from "@mui/styles";

export default makeStyles({
  masonry: {
    listStyle: "none",
    padding: "0 40px",
    margin: "0 auto",
  },
  rightSide: { width: "100%", margin: "0 auto" },
  "@media (min-width: 1001px)": {
    masonry: {
      maxWidth: 840,
    },
  },
  "@media (max-width: 1000px)": {
    masonry: {
      maxWidth: 620,
    },
  },
  "@media (max-width: 510px)": {
    masonry: {
      maxWidth: 320,
    },
  },
  pagination: {
    width: "fit-content",
    margin: "0 auto",
    paddingBottom: 25,
  },
  notFetchedContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  productsError: {
    width: "600px",
    height: "600px",
    margin: "20px",
  },
});

export const animations = {
  products: {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  },
  product: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  },
};
