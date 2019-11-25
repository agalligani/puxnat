import React from "react";
import Home from "../screens/Home";
import { StatusBar, View, Text, Button, AppRegistry } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import CreatePuzzle from "../screens/CreatePuzzle";
import CreateGrid from "../screens/CreateGrid";
import GridList from "../screens/GridList";
import PuzzlesEdit from "../screens/PuzzlesEdit";
import PuzzleList from "../components/PuzzleList";
import { BuildMenu, ChooseAGrid } from "../modals";

const MainStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null
      }
    },
    CreatePuzzle: {
      screen: CreatePuzzle,
      navigationOptions: {}
    },
    PuzzlesEdit: {
      screen: PuzzlesEdit,
      navigationOptions: {
        header: () => <Text>Grid List</Text>
      }
    },
    EditPuzzle: {
      screen: CreatePuzzle,
      navigationOptions: {}
    },
    CreateGrid: {
      screen: CreateGrid,
      navigationOptions: {
        header: () => null
      }
    },
    GridList: {
      screen: GridList,
      navigationOptions: {
        header: () => <Text>Grid List</Text>
      }
    },
    PuzzleList: {
      screen: PuzzleList,
      navigationOptions: {}
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack
    },
    BuildMenu: {
      screen: BuildMenu
    },
    ChooseAGrid: {
      screen: ChooseAGrid
    },
    CreatePuzzle: {
      screen: CreatePuzzle,
      navigationOptions: {}
    },
    PuzzlesEdit: {
      screen: PuzzlesEdit,
      navigationOptions: {
        header: () => <Text>Grid List</Text>
      }
    },
    PuzzleList: {
      screen: PuzzleList,
      navigationOptions: {}
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

// AppRegistry.registerComponent("RootStack", () => RootStack);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
