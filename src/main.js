import React from "react";
import { Root } from "native-base";
import GridList from "./views/GridList";
import CreateGrid from "./views/CreateGrid";
import LayoutList from "./views/LayoutList";
import { createStackNavigator, createAppContainer } from "react-navigation";

const RootStack = createStackNavigator(
  {
    Home: GridList,
    CreateGrid: CreateGrid,
    LayoutList: LayoutList
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Main extends React.Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root>
    );
  }
}
