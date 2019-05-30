import React from "react";
import { AsyncStorage, StyleSheet, Alert, TextInput } from "react-native";
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
    currentPuzzle: [],
    allGrids: [],
    allPuzzles: [],
    newGridsList: [],
    gridsInList: [],
    clickedGrid: {},
    isPuzzle: false,
    action: "editGrid"
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
    let currentPuzzle = {};
    currentPuzzle.puzzle = this.state.currentGrid;
    let gridId = currentPuzzle.puzzle.id;
    currentPuzzle.puzzle.gridId = gridId;
    currentPuzzle.puzzle.id = null;
    this.props.navigation.navigate("CreatePuzzle", {
      currentGrid: currentPuzzle,
      newGrid: false,
      action: "editPuzzle"
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
          <Grid puzzle={this.state.currentGrid} action={this.state.action} />
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
