import { createAppContainer, createDrawerNavigator } from "react-navigation";
import CreateGrid from "./screens/CreateGrid";
import GridList from "./screens/GridList";
import PuzzleList from "./screens/PuzzleList";

const HamburgerNavigation = createDrawerNavigator(
  {
    PuzzleList: PuzzleList,
    CreateGrid: CreateGrid,
    GridList: GridList
  },
  {
    initialRouteName: "GridList"
  }
);

export default createAppContainer(HamburgerNavigation);
