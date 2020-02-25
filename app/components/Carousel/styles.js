import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "$white",
    marginLeft: 12
  },
  answerLetter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    marginRight: -1,
    borderColor: "#999999",
    textAlign: "center",
    lineHeight: 19,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333"
  }
});
