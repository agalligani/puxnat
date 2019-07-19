import Home from "../screens/Home";
import { StatusBar, View, Text, Button } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import CreatePuzzle from "../screens/CreatePuzzle";
import CreateGrid from "../screens/CreateGrid";
import GridList from "../screens/GridList";
import PuzzleList from "../screens/PuzzleList";
import { BuildMenu, ChooseAGrid } from "../components/Modals";

const MainStack = createStackNavigator({
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
  CreateGrid: {
    screen: CreateGrid,
    navigationOptions: {}
  },
  GridList: {
    screen: GridList,
    navigationOptions: {}
  },
  PuzzleList: {
    screen: CreateGrid,
    navigationOptions: {}
  }
});

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
