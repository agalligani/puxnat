import React, { Fragment } from "react";
import {
  View,
  AsyncStorage,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";

import styles from "./styles";
import { GridThumbnail } from "../GridThumbnail";
import { Ionicons } from "@expo/vector-icons";

export default class PuzzleList extends React.Component {
  state = {
    puzzlesEmpty: true,
    allPuzzles: [],
    clickedPuzzle: {},
    savedPuzzles: []
  };

  componentDidMount = async () => {
    try {
      const savedPuzzles = await AsyncStorage.getItem("allPuzzles");
      if (savedPuzzles !== null) {
        this.setState({
          puzzlesEmpty: false,
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

  // puzzleMetadata will need to return more interesting visuals

  puzzleMetadata = grid => {
    let squares = grid.length;
    let blankSquares = grid.filter(sq => sq == "").length;
    let blackSquares = grid.filter(sq => sq == ".").length;
    let answerSquares = squares - blackSquares;
    let percentageFilled = Math.floor(
      ((answerSquares - blankSquares) / answerSquares) * 100
    );

    return (
      // cheesy placeholder
      <Text>
        Answer Squares: {answerSquares}
        {"\n"}
        Black Squares: {blackSquares}
        {"\n"}
        Filled: {percentageFilled}
        {"%"}
      </Text>
    );
  };

  render() {
    let { height, width } = Dimensions.get("window");
    let gridWidth = width * 0.3;
    if (!this.state.puzzlesEmpty) {
      return (
        <ScrollView contentContainerStyle={styles.listContainer}>
          {this.state.allPuzzles.map(puzzle => {
            if (puzzle !== null) {
              return (
                <TouchableOpacity
                  key={puzzle.id}
                  onPress={this._handleEditPuzzlePress.bind(this, puzzle)}
                  style={styles.touchable}
                >
                  <View style={styles.puzzleView}>
                    <GridThumbnail puzzle={puzzle.puzzle} width={gridWidth} />
                  </View>
                  <View style={styles.textContainer}>
                    <View>
                      <Text style={styles.largeText}>
                        {puzzle.puzzle.size.cols}x{puzzle.puzzle.size.rows}
                      </Text>
                    </View>
                    <Text style={styles.normalText}>
                      {this.puzzleMetadata(puzzle.puzzle.grid)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text>No Puzzles have been created.</Text>
          <Ionicons name="emoticon-neutral" size={32} color="green" />;
        </View>
      );
    }
  }
}
