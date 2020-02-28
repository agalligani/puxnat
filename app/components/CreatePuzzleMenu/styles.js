import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  menuContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "$white"
  },
  menuButton: {
    width: 45,
    height: 45,
    display: "flex",
    flexDirection: "row",
    color: "#ffffff",
    backgroundColor: "#ffffff"
  },
  muliText: {
    fontFamily: "muli-bold",
    fontSize: 30,
    color: "#333",
    fontWeight: "bold"
  },
  muliText20: {
    fontFamily: "muli-bold",
    fontSize: 20,
    color: "#333",
    fontWeight: "bold"
  }
});
