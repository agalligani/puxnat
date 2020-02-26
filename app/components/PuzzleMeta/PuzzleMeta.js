import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";

export default class PuzzleMeta extends Component {
  state = {
    answerSquares: 0,
    blackSquares: 0,
    percentageFilled: 0
  };

  puzzleMetadata = grid => {
    let squares = grid.length;
    let blankSquares = grid.filter(sq => sq == "").length;
    let blackSquares = grid.filter(sq => sq == ".").length;
    let answerSquares = squares - blackSquares;
    let percentageFilled = Math.floor(
      ((answerSquares - blankSquares) / answerSquares) * 100
    );
  };

  render() {
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
  }
}
