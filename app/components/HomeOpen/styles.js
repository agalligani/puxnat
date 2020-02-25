import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: "$white"
  },
  touchable: {
    backgroundColor: "$white",
    margin: 12,
    width: "100%",
    flexDirection: "row"
    // backgroundColor: "$grey",
    // borderColor: "$lightGrey",
    // borderWidth: 3,
  },
  puzzleView: {
    flex: 4,
    alignItems: "center"
  },
  puzzle: {},
  textContainer: {
    flex: 6,
    color: "$white",
    backgroundColor: "$lightMustard",
    padding: 10
  },
  largeText: {
    fontSize: 30,
    color: "$white",
    fontWeight: "bold"
  },
  normalText: {
    fontSize: 18,
    textAlign: "center",
    color: "$grey"
  }
});
