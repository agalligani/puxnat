import React from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import Navigator from "./config/routes";

EStyleSheet.build({
  $happyPink: "#dd669C",
  $primaryCharcoal: "#90b6ca",
  $white: "#FFFFFF",
  $blue: "#0d7fb5",
  $lightGrey: "#F1F1F5",
  $slate: "#8d9ca3",
  $grey: "#818997",
  $lightBlue: "#90b6ca",
  $lightMustard: "#ffdb58",

  $h1white: { color: "$white", fontSize: 100 }
});

export default () => <Navigator />;
