import Home from "../screens/Home";
import { StatusBar, View, Text, Button } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import CreatePuzzle from "../screens/CreatePuzzle";
import CreateGrid from "../screens/CreateGrid";
import GridList from "../screens/GridList";
import PuzzleList from "../screens/PuzzleList";
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
    EditPuzzle: {
      screen: CreatePuzzle,
      navigationOptions: {}
    },
    CreateGrid: {
      screen: CreateGrid,
      navigationOptions: {}
    },
    GridList: {
      screen: GridList,
      navigationOptions: {
        header: () => "Grid List"
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
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
