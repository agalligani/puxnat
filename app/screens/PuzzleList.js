import React from "react";
import { AsyncStorage } from "react-native";
import { Body, Text, List, ListItem, Fab, Icon } from "native-base";
import { SafeAreaView, StatusBar, Button } from "react-native";

export default class PuzzleList extends React.Component {
  state = { allPuzzles: [], clickedPuzzle: {}, savedPuzzles: [] };

  _handleEditPuzzlePress = p => {
    this.setState({ clickedPuzzle: { zygote: "b" } });
    console.log("p-list", p);
    this.props.navigation.navigate("EditPuzzle", {
      currentGrid: p,
      puzzles: this.state.allPuzzles,
      savePuzzleById: async puzzle => {
        await this._removePuzzle(puzzle);
        this.setState({
          allPuzzles: this.state.allPuzzles.concat({
            name: puzzle.name,
            id: puzzle.id,
            puzzle: puzzle.puzzle
          })
        });
        await AsyncStorage.setItem(
          "allPuzzles",
          JSON.stringify(this.state.allPuzzles)
        );
      }
    });
  };

  _removePuzzle = async p => {
    try {
      await this.setState({
        allPuzzles: this.state.allPuzzles.filter(puzz => p.id !== puzz.id)
      });
      await AsyncStorage.setItem(
        "allPuzzles",
        JSON.stringify(this.state.allPuzzles)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  componentWillMount = async () => {
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
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <List>
          {this.state.allPuzzles.map(puzzle => {
            if (puzzle !== null) {
              return (
                <ListItem
                  key={puzzle.id}
                  onPress={this._handleEditPuzzlePress.bind(this, puzzle)}
                >
                  <Body>
                    <Text>
                      {puzzle.name}
                      {/* {grid.grid.size.cols}x{grid.grid.size.rows} */}
                    </Text>
                  </Body>
                </ListItem>
              );
            }
          })}
        </List>
        <Button
          onPress={() => this.props.navigation.navigate("Home")}
          title="Return"
        />
      </SafeAreaView>
    );
  }
}
