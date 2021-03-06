import React from "react";
import { AsyncStorage } from "react-native";
import { Body, Right, Text, List, ListItem, Icon } from "native-base";
import { SafeAreaView, StatusBar, Button } from "react-native";
import emptyGrid from "../utils/emptyGrid";

export default class GridList extends React.Component {
  static navigationOptions = {
    title: "Grids",
    headerStyle: {
      backgroundColor: "#ccc"
    },
    headerTitleStyle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "600"
    }
  };

  state = {
    grids: [],
    newGridsList: [],
    gridsInList: [],
    currentGrid: {}
  };

  _handleCreateGridPress = g => {
    let newGrid = {};
    newGrid = emptyGrid(15, 15);
    this.setState({ currentGrid: newGrid });
    this.props.navigation.navigate("CreateGrid", {
      saveGrid: grid => {
        this.setState({ grids: this.state.grids.concat(grid) });
      },
      newGrid: newGrid,
      gridsInList: this.state.grids,
      currentGrid: this.state.currentGrid,
      action: "editGrid"
    });
  };

  _handleEditGridPress = clickedGrid => {
    this.setState({ clickedGrid: clickedGrid });
    this.props.navigation.navigate("CreateGrid", {
      saveGridById: async grid => {
        await this._removeGrid(grid);
        this.setState({
          grids: this.state.grids.concat({
            name: grid.id,
            id: grid.id,
            grid: grid
          })
        });
        await AsyncStorage.setItem(
          "allGrids",
          JSON.stringify(this.state.grids)
        );
      },
      clickedGrid: clickedGrid,
      currentGrid: this.state.clickedGrid,
      newGrid: false
    });
  };

  _removeGrid = async g => {
    try {
      await this.setState({
        grids: this.state.grids.filter(grid => g.id !== grid.id)
      });
      await AsyncStorage.setItem("allGrids", JSON.stringify(this.state.grids));
    } catch (error) {
      console.log(error.message);
    }
  };

  componentWillMount = async () => {
    try {
      const savedGrids = await AsyncStorage.getItem("allGrids");
      if (savedGrids !== null) {
        this.setState({
          grids: JSON.parse(savedGrids)
        });
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <List>
          {this.state.grids.map(grid => {
            if (grid !== null) {
              return (
                <ListItem
                  key={grid.id}
                  onPress={this._handleEditGridPress.bind(this, grid)}
                >
                  <Body>
                    <Text>
                      {/* {grid.name} */}
                      {grid.grid.size.cols}x{grid.grid.size.rows}
                    </Text>
                  </Body>
                  <Right>
                    <Icon
                      ios="ios-remove-circle"
                      android="md-remove-circle"
                      style={{ color: "red" }}
                      onPress={this._removeGrid.bind(this, grid)}
                    />
                  </Right>
                </ListItem>
              );
            }
          })}
        </List>
        <Button
          title="Create New Grid"
          onPress={this._handleCreateGridPress.bind(this)}
        />
        <Button title="Cancel" onPress={() => this.props.navigation.goBack()} />
      </SafeAreaView>
    );
  }
}
