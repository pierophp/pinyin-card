import { makeStyles } from "@material-ui/core/styles";
export default makeStyles(() => ({
  cardContainer: {
    backgroundColor: "#fff",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    height: "calc(100vh - 56px)",
    width: "100%",
    position: "relative",
  },
  landscape: {
    backgroundSize: "auto 100vh",
  },
  portrait: {
    backgroundSize: "100vw auto",
  },
  informationContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "180px",
    minHeight: "75px",
    textAlign: "center",
    position: "absolute",
    left: 70,
    bottom: 40,
  },
  title: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: "25px",
  },
  translationTitle: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: "25px",
  },
  pronunciation: {
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: "25px",
  },
  containerClick: {
    display: "flex",
  },
  leftClick: {
    width: "50%",
    height: "calc(100vh - 56px)",
  },
  rightClick: {
    width: "50%",
    height: "calc(100vh - 56px)",
  },
  genderM: {
    color: "#34bdff",
  },
  genderF: {
    color: "#ff5757",
  },
  genderN: {
    color: "#a8fd5a",
  },
}));
