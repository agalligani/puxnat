import React from "react";
import GridList from "./views/GridList";
import CreateGrid from "./views/CreateGrid";
import { createStackNavigator, createAppContainer } from "react-navigation";

const RootStack = createStackNavigator(
  {
    Home: GridList,
    CreateGrid: CreateGrid
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Main extends React.Component {
  render() {
    return <AppContainer />;
  }
}
