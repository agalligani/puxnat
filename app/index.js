import React from "react";
import Home from "./screens/Home";
import EStyleSheet from "react-native-extended-stylesheet";

EStyleSheet.build({
  $primaryCharcoal: "#444555"
});
// import HamburgerNavigation from "./HamburgerNavigation";

// export default class App extends React.Component {
//   render() {
//     return <HamburgerNavigation />;
//   }
// }

export default () => <Home />;
