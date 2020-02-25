import React from "react";
import {
  AsyncStorage,
  // Alert,
  SafeAreaView,
  StatusBar,
  Button
} from "react-native";
import Grid from "../components/Grid/Grid";
import Prompt from "rn-prompt";

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
    action: "editGrid",
    promptVisible: false
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
      this.setState({ promptVisible: true });
      // prompt(
      //   "Enter Grid Name",
      //   "",
      //   [
      //     { text: "Cancel" },
      //     { text: "OK", onPress: this.addNewGrid.bind(this) }
      //   ],
      //   {
      //     type: "plain-text"
      //   }
      // );
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
    this.props.navigation.navigate("PuzzleFill", {
      currentGrid: currentPuzzle,
      newGrid: false,
      action: "editPuzzle"
    });
  };

  _openGridList = _ => {
    this.props.navigation.navigate("GridList", {});
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
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Grid puzzle={this.state.currentGrid} action={this.state.action} />
        <Button
          title="Save Changes to Grid"
          onPress={this._handleCreateGridPress.bind(this)}
        />
        <Button
          title="Create Puzzle Using Grid"
          onPress={this._handleCreatePuzzlePress.bind(this)}
        />
        <Button
          title="Show Grid List"
          onPress={this._openGridList.bind(this)}
        />
        <Button onPress={() => this.props.navigation.goBack()} title="Cancel" />
        {/* This isn't saving name - do we even need to name grids? */}
        <Prompt
          title="Enter a Name for this Grid"
          placeholder="Start typing"
          defaultValue=""
          visible={this.state.promptVisible}
          onCancel={() =>
            this.setState({
              promptVisible: false
            })
          }
          onSubmit={
            (value =>
              this.setState({
                promptVisible: false,
                message: `You said "${value}"`
              }),
            this.addNewGrid.bind(this))
          }
        />
      </SafeAreaView>
    );
  }
}
