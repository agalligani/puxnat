import React from "react";
import { Root } from "native-base";
import GridList from "./views/GridList";
import CreateGrid from "./views/CreateGrid";
import PuzzleList from "./views/PuzzleList";
import CreatePuzzle from "./views/CreatePuzzle";
import { createStackNavigator, createAppContainer } from "react-navigation";

const RootStack = createStackNavigator(
  {
    Home: GridList,
    PuzzleList: PuzzleList,
    CreateGrid: CreateGrid,
    CreatePuzzle: CreatePuzzle,
    EditPuzzle: CreatePuzzle
  },
  {
    // initialRouteName: "PuzzleList"
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
