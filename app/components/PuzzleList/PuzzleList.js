import React from "react";
import {
  View,
  AsyncStorage,
  ScrollView,
  Image,
  Text,
  TouchableOpacity
} from "react-native";

import { H1, H2, H3 } from "native-base";

import styles from "./styles";

import { GridThumbnail } from "../GridThumbnail";

export default class PuzzleList extends React.Component {
  state = { allPuzzles: [], clickedPuzzle: {}, savedPuzzles: [] };

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

  _handleEditPuzzlePress = p => {
    this.props.navigation.navigate("PuzzleFill", {
      currentGrid: p,
      newPuzzle: false,
      puzzleView: "Grid",
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

  render() {
    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        {this.state.allPuzzles.map(puzzle => {
          if (puzzle !== null) {
            return (
              <TouchableOpacity
                key={puzzle.id}
                key={puzzle.id}
                onPress={this._handleEditPuzzlePress.bind(this, puzzle)}
                style={styles.touchable}
              >
                <GridThumbnail puzzle={puzzle.puzzle} />
                <View style={styles.textContainer}>
                  <Text style={styles.largeText}>
                    {puzzle.puzzle.size.cols}x{puzzle.puzzle.size.rows}
                  </Text>
                  <Text style={styles.normalText}>
                    Important puzzle info....
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>
    );
  }
}
