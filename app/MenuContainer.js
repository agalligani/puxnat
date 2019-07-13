import {
  createAppContainer,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import { Icon, Header } from "react-native-elements";
import React from "react";

import CreateGrid from "./views/CreateGrid";
import GridList from "./views/GridList";
import PuzzleList from "./views/PuzzleList";

const Menu = createDrawerNavigator(
  {
    PuzzleList: PuzzleList,
    CreateGrid: CreateGrid,
    GridList: GridList
  },
  {
    drawerWidth: 300,
    drawerPosition: "left",
    initialRouteName: "GridList"
  }
);

const MenuContainer = () => {
  let pressMenu;

  return (
    <React.Fragment>
      <Header
        backgroundColor="white"
        leftComponent={
          <Icon
            name="menu"
            onPress={() => {
              pressMenu.dispatch(DrawerActions.toggleDrawer());
            }}
          />
        }
      />
      <Menu
        ref={navigatorRef => {
          pressMenu = navigatorRef;
        }}
      />
    </React.Fragment>
  );
};

export default MenuContainer;
