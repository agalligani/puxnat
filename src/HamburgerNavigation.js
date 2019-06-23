import { createAppContainer, createDrawerNavigator } from "react-navigation";
import CreateGrid from "./views/CreateGrid";
import GridList from "./views/GridList";
import PuzzleList from "./views/PuzzleList";

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
