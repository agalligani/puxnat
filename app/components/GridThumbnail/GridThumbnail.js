import React, { Component } from "react";
import { Dimensions } from "react-native";
import _ from "lodash";
import { Body, Spinner } from "native-base";
import styles from "./styles";
import * as Svg from "react-native-svg";

class GridThumbnail extends Component {
  state = {
    puzzleIsEmpty: true,
    puzzle: {},
    showLetters: false,
    cursorDirection: "across",
    whiteSquares: []
  };

  componentDidMount = _ => {
    if (this.props.puzzle.grid) {
      this.setState({ puzzle: this.props.puzzle });
      this.setState({ width: this.props.width });
    }
  };

  render() {
    if (this.state.puzzle.grid) {
      let { grid, size } = this.state.puzzle;
      let { cols, rows } = size;
      width = this.state.width;
      return (
        <Svg.Svg height={width} width={width}>
          <Svg.G fill="white" stroke-width="1">
            {grid.map((sq, index) => {
              let squareWidth = width / cols;
              let height = squareWidth;
              let x = index % cols;
              let posx = x * squareWidth;
              let y = Math.floor(index / cols);
              let posy = y * height;
              let fill = sq === "." ? "#555555" : "#ffffff";
              let letter = sq === "." ? "" : sq;
              let squareFill =
                index == this.state.activeSquare ? "#ffdd00" : fill;
              let textElement = (
                <Svg.Text
                  x={squareWidth * 0.25}
                  y={squareWidth * 0.8}
                  font-family={"Verdana"}
                  fontSize="17"
                  stroke="#0d7fb5"
                  fill="#0d7fb5"
                  strokeWidth=".5"
                  id={"letter" + index}
                >
                  {letter}
                </Svg.Text>
              );

              letter = textElement;

              return (
                <Svg.G x={posx} y={posy} key={index} tabIndex="0">
                  <Svg.Rect
                    width={squareWidth}
                    height={squareWidth}
                    strokeWidth={1}
                    stroke="#8C8C99"
                    fill={squareFill}
                  />
                  {letter}
                </Svg.G>
              );
            })}
          </Svg.G>
        </Svg.Svg>
      );
    } else {
      let { width, height } = Dimensions.get("window");
      return (
        <Body>
          <Spinner color="black" style={{ marginTop: height / 3 }} />
        </Body>
      );
    }
  }
}

export default GridThumbnail;
