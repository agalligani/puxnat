import React from "react";
import { AsyncStorage, Alert } from "react-native";
import Grid from "../components/Grid/Grid";
import prompt from "react-native-prompt-android";
import { Container, Content, Fab, Icon } from "native-base";
import { SafeAreaView, StatusBar, Button } from "react-native";

export default class CreatePuzzle extends React.Component {
  state = {
    allPuzzles: [],
    currentPuzzle: {},
    isPuzzle: true,
    action: null
  };

  savePuzzleById = async puzzle => {
    // await this._removeP(puzzle);
    this.setState({
      puzzles: this.state.allPuzzles.concat({
        name: puzzle.name,
        id: puzzle.id,
        puzzle: puzzle
      })
    });
    await AsyncStorage.setItem(
      "allPuzzles",
      JSON.stringify(this.state.allPuzzles)
    );
  };

  _handleSavePress = _ => {
    if (this.state.currentPuzzle.id === null) {
      prompt(
        "Enter Puzzle Name",
        "",
        [
          { text: "Cancel" },
          { text: "OK", onPress: this.addNewPuzzle.bind(this) }
        ],
        {
          type: "plain-text"
        }
      );
    } else {
      this.savePuzzleById(this.state.currentPuzzle);
      return;
    }
  };

  addNewPuzzle = async name => {
    let currentPuzzle = this.state.currentPuzzle;
    currentPuzzle.id = Math.floor(Math.random() * 100000);
    this.setState({ currentPuzzle: currentPuzzle });
    const newPuzzleList = this.state.allPuzzles.concat({
      name: name,
      id: currentPuzzle.id,
      puzzle: this.state.currentPuzzle
    });
    this.setState({ allPuzzles: newPuzzleList });

    try {
      await AsyncStorage.setItem("allPuzzles", JSON.stringify(newPuzzleList));
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
    this.setState({ allPuzzles: newPuzzleList });
    // this.props.navigation.state.params.savePuzzle(newPuzzlesList.slice(-1)[0]);
  };

  componentWillMount = async _ => {
    this.setState({
      currentPuzzle: this.props.navigation.state.params.currentGrid.puzzle,
      action: this.props.navigation.state.params.action
    });
    if (this.props.navigation.state.params.puzzles) {
      this.setState({ allPuzzles: this.props.navigation.state.params.puzzles });
    } else {
      try {
        const savedPuzzles = await AsyncStorage.getItem("allPuzzles");
        if (savedPuzzles !== null) {
          this.setState({
            allPuzzles: JSON.parse(savedPuzzles)
          });
        } else {
          console.log("no data");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  componentDidMount = _ => {};

  _openPuzzleList = _ => {
    this.props.navigation.navigate("PuzzleList", {
      savePuzzleById: async grid => {}
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        {
          <Grid
            key=""
            puzzle={this.state.currentPuzzle}
            action={this.state.action}
          />
        }
        <Button title="Save" onPress={this._handleSavePress.bind(this)} />
        <Button title="Return" onPress={this._openPuzzleList.bind(this)} />
      </SafeAreaView>
    );
  }
}
