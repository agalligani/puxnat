import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333333"
  },
  title: { fontSize: 30 },
  subtitle: {
    textAlign: "center",
    fontSize: 15,
    alignItems: "center",
    justifyContent: "center",
    width: 260,
    paddingVertical: 10
  },
  titleRegion: { flex: 1, alignItems: "center", justifyContent: "center" },

  gridRegion: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: "#eeeeee",
    flexDirection: "column",
    width: 260
  },

  gridRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    paddingHorizontal: 14,
    width: 260
  },

  gridBox: {
    width: 65,
    height: 65,
    backgroundColor: "skyblue",
    justifyContent: "center"
  },

  gridBoxText: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center"
  },

  footRegion: { flex: 1, alignItems: "center", justifyContent: "center" }
});
