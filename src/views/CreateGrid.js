import React from "react";
import { AsyncStorage, StyleSheet, Alert } from "react-native";
import prompt from "react-native-prompt-android";
import Grid from "../components/Grid";
import {
  Body,
  Container,
  Content,
  Button,
  Text,
  List,
  ListItem,
  Fab,
  Icon
} from "native-base";

export default class CreateGrid extends React.Component {
  state = {
    currentGrid: [],
    allGrids: [],
    newGridsList: [],
    gridsInList: [],
    clickedGrid: {}
  };

  addNewGrid = async name => {
    let currentGrid = this.state.currentGrid;
    currentGrid.id = Math.floor(Math.random() * 100000);
    this.setState({ currentGrid: currentGrid });
    const newGridsList = this.state.allGrids.concat({
      name: name,
      id: currentGrid.id,
      grid: this.state.currentGrid
    });

    try {
      await AsyncStorage.setItem("allGrids", JSON.stringify(newGridsList));
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
    this.setState({ allGrids: newGridsList });
    this.props.navigation.state.params.saveGrid(newGridsList.slice(-1)[0]);
  };

  //Change this function name!
  _handleCreateGridPress = _ => {
    if (this.state.currentGrid.id === null) {
      prompt(
        "Enter Grid Name",
        "",
        [
          { text: "Cancel" },
          { text: "OK", onPress: this.addNewGrid.bind(this) }
        ],
        {
          type: "plain-text"
        }
      );
    } else {
      this.props.navigation.state.params.saveGridById(this.state.currentGrid);
      return;
    }
  };

  _handleCreatePuzzlePress = _ => {
    this.props.navigation.navigate("CreatePuzzle", {
      // saveGridById: async grid => {
      //   await this._removeGrid(grid);
      //   this.setState({
      //     grids: this.state.grids.concat({
      //       name: grid.id,
      //       id: grid.id,
      //       grid: grid
      //     })
      //   });
      //   await AsyncStorage.setItem(
      //     "allGrids",
      //     JSON.stringify(this.state.grids)
      //   );
      // },
      currentGrid: this.state.currentGrid,
      newGrid: false
    });
  };

  componentWillMount = async _ => {
    if (this.props.navigation.state.params.clickedGrid) {
      let newGrid = this.props.navigation.state.params.clickedGrid.grid;
      this.setState({ currentGrid: newGrid });
    } else {
      let newGrid = this.props.navigation.state.params.newGrid;
      this.setState({ currentGrid: newGrid });
    }
    try {
      const allGrids = await AsyncStorage.getItem("allGrids");
      if (allGrids !== null) {
        // We have data!!
        this.setState({
          allGrids: JSON.parse(allGrids)
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Body>
            <Grid puzzle={this.state.currentGrid} />
          </Body>
        </Content>
        <Fab
          active={false}
          style={{ backgroundColor: "#5067ff" }}
          position="bottomRight"
          onPress={this._handleCreateGridPress.bind(this)}
        >
          <Icon name="save" />
        </Fab>
        <Fab
          active={false}
          style={{ backgroundColor: "#5067ff" }}
          position="bottomLeft"
          onPress={this._handleCreatePuzzlePress.bind(this)}
        >
          <Icon name="keypad" />
        </Fab>
      </Container>
    );
  }
}
