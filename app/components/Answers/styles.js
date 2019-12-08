import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "$white"
  },
  answerLetter: {
    width: 14,
    height: 14,
    borderWidth: 1,
    marginRight: -1,
    borderColor: "#999999",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: "#333333"
  }
});
