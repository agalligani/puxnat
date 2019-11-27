import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  listContainer: {
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor: "$blue"
  },
  touchable: {
    alignItems: "center",
    color: "$white",
    justifyContent: "center",
    // backgroundColor: "$grey",
    // borderColor: "$lightGrey",
    // borderWidth: 3,
    marginTop: 25,
    padding: 12
  },
  textContainer: {
    alignItems: "center",
    color: "$white",
    justifyContent: "center",
    backgroundColor: "$lightGrey",
    // borderColor: "$lightGrey",
    marginTop: 6,
    padding: 6
  },
  largeText: {
    fontSize: 30,
    color: "$grey"
  },
  normalText: {
    fontSize: 18,
    color: "$blue"
  }
});
