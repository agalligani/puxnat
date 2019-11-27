import React, { Component } from "react";
import _ from "lodash";
import { Body, Spinner } from "native-base";
import styles from "./styles";
import * as Svg from "react-native-svg";

// This Component was created from Grid component
// It was thought a simplified version would be
// Better to create simple thumbnails

class GridThumbnail extends Component {
  state = {
    puzzleIsEmpty: true,
    puzzle: {},
    showLetters: false,
    cursorDirection: "across",
    whiteSquares: []
  };

  componentWillMount = _ => {
    if (this.props.puzzle.grid) {
      this.setState({ puzzle: this.props.puzzle });
    }
  };

  render() {
    if (this.state.puzzle.grid) {
      let { grid, size, gridnums } = this.state.puzzle;
      let { cols, rows } = size;
      width = 180;
      return (
        <Svg.Svg height={width} width={width}>
          <Svg.G fill="white" stroke-width="5">
            {grid.map((sq, index) => {
              let squareWidth = width / cols;
              let height = squareWidth;
              let x = index % cols;
              let posx = x * squareWidth;
              let y = Math.floor(index / cols);
              let posy = y * height;
              let fill = sq === "." ? "#111111" : "#ffffff";
              let letter = sq;
              let squareFill =
                index == this.state.activeSquare ? "#ffdd00" : fill;
              let textElement = (
                <Svg.Text
                  x={squareWidth * 0.25}
                  y={squareWidth * 0.8}
                  font-family={"Verdana"}
                  fontSize="8"
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
                    stroke="#444444"
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
