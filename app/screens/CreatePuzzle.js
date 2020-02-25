import React from "react";
import {
  SafeAreaView,
  StatusBar,
  AsyncStorage,
  Alert,
  Button
} from "react-native";
import Grid from "../components/Grid/Grid";
// import prompt from "react-native-prompt-android";
import { isEmpty } from "lodash";

export default class CreatePuzzle extends React.Component {
  state = {
    allPuzzles: [],
    currentPuzzle: {},
    isPuzzle: true,
    action: null
  };

  savePuzzleById = async puzzle => {
    // await this._removeP(puzzle);
    puzzle.name = "null";
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

  buildAcrossAnswers = _ => {
    let currentPuzzle = this.state.currentPuzzle;
    let { size, grid } = this.state.currentPuzzle;
    currentPuzzle.answers.across = [];

    acrossGrid = grid
      .map(sq => (sq = sq == "" ? " " : sq))
      .join()
      .replace(/,/g, "");

    for (i = 0; i < size.rows; i++) {
      pos = i * size.cols;
      n = acrossGrid.substr(pos, size.cols);
      currentPuzzle.answers.across = currentPuzzle.answers.across.concat(
        n.split(".").filter(sq => !isEmpty(sq))
      );
    }
    this.setState({ currentPuzzle: currentPuzzle });
  };

  //pass the whole puzzle so we can get grid and grid size
  buildDownAnswers = _ => {
    let currentPuzzle = this.state.currentPuzzle;
    let { cols, rows } = currentPuzzle.size;
    let colString = "";
    let downAnswers = [];

    for (x = 0; x < cols; x++) {
      for (i = 0; i < rows; i++) {
        colString = isEmpty(currentPuzzle.grid[x + i * rows])
          ? colString + " "
          : colString + currentPuzzle.grid[x + i * rows];
      }
      downAnswers = downAnswers.concat(
        colString.split(".").filter(sq => !isEmpty(sq))
      );
      colString = "";
    }
    currentPuzzle.answers.down = downAnswers;
    this.setState({ currentPuzzle: currentPuzzle });
  };

  _handleSavePress = _ => {
    console.log("here 1");
    this.buildAcrossAnswers();
    this.buildDownAnswers();

    if (this.state.currentPuzzle.id === null) {
      this.addNewPuzzle.bind(this);
      console.log("here 2");
      console.log(this.state.currentPuzzle.id);
    } else {
      this.savePuzzleById(this.state.currentPuzzle);
      return;
    }
  };

  addNewPuzzle = async _ => {
    console.log("what the living fuck?");
    let currentPuzzle = this.state.currentPuzzle;
    console.log("--->", currentPuzzle);
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

  componentDidMount = async _ => {
    console.log("component did mount");
    console.log("+++++>", this.state.currentPuzzle.grid);
  };

  componentWillMount = async _ => {
    console.log("component will mount?");
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
          this.setState({
            allPuzzles: []
          });
          console.log("no data");
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  _openPuzzleList = _ => {
    this.props.navigation.navigate("PuzzlesEdit", {
      savePuzzleById: async grid => {}
    });
  };

  _returnHome = _ => {
    this.props.navigation.navigate("Home", {});
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
        <Button title="Return" onPress={this._returnHome.bind(this)} />
      </SafeAreaView>
    );
  }
}
