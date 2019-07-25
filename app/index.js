import React from "react";
import Home from "./screens/Home";
import EStyleSheet from "react-native-extended-stylesheet";
import Navigator from "./config/routes";
import { ChooseAGrid } from "./modals";

// import Routes from "./config/routes";

EStyleSheet.build({
  $primaryCharcoal: "#444555",
  $white: "#FFFFFF"
});

export default () => <Navigator />;
// export default () => <ChooseAGrid />;
