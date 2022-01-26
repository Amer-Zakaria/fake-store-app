import { makeStyles } from "@mui/styles";

export default makeStyles({
  icon: {
    color: "#222",
  },
  iconButton: {
    padding: 8,
  },
  iconsContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "rgb(200,200,200, 0.7)",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 20,
    display: "flex",
    justifyContent: "space-between",
  },
});
