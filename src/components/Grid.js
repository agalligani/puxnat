import React, { Component } from "react";
import { Constants, Svg } from "expo";
import _ from "lodash";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Container, Content, Spinner, Button, Text } from "native-base";

class Grid extends Component {
  state = {
    puzzleIsEmpty: true,
    width: 0,
    height: 0,
    puzzle: {},
    showNumbers: true,
    showLetters: false,
    clickedSquare: null
  };

  _gridSquarePress = g => {
    let { puzzle } = this.state;
    puzzle.grid[g] = puzzle.grid[g] == "." ? "" : ".";
    this._gridRenumber();
    // this.setState({ puzzle: puzzle });
  };

  _gridRenumber = _ => {
    let num = 0;
    let gridnums = [];
    let { size, grid } = this.state.puzzle;
    grid.forEach((e, i) => {
      if (e == ".") {
        gridnums[i] = 0;
      } else {
        if (
          i < size.cols ||
          grid[i - 1] == "." ||
          grid[i - size.cols] == "." ||
          i % size.cols == 0
        ) {
          num += 1;
          gridnums[i] = num;
        } else {
          gridnums[i] = 0;
        }
      }
    });
    this.state.puzzle.gridnums = gridnums;
    this.setState({ puzzle: this.state.puzzle });
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
      let { width } = Dimensions.get("window");
      // Adjust for Native Base container?
      width = width - 32;
      return (
        <Svg height={width} width={width}>
          <Svg.G fill="white" stroke="green" stroke-width="5">
            {grid.map((sq, index) => {
              let squareWidth = width / cols;
              let height = squareWidth;
              let x = index % cols;
              let posx = x * squareWidth;
              let y = Math.floor(index / cols);
              let posy = y * height;
              let fill = sq === "." ? "#111111" : "#ffffff";
              let gridNum = gridnums[index] == 0 ? null : gridnums[index];

              return (
                <Svg.G x={posx} y={posy} key={index} tabIndex="0">
                  <Svg.Rect
                    width={squareWidth}
                    height={squareWidth}
                    strokeWidth={1}
                    stroke="#111111"
                    fill={fill}
                    onPress={this._gridSquarePress.bind(this, index)}
                    style={{ backgroundColor: "red", padding: 0 }}
                  />
                  <Svg.Text
                    style={{ pointerEvents: "none" }}
                    x="2"
                    y="8"
                    font-family={"Verdana"}
                    fontSize="8px"
                    stroke="blue"
                    strokeWidth=".5"
                    id="clue1"
                  >
                    {gridNum}
                  </Svg.Text>
                </Svg.G>
              );
            })}
          </Svg.G>
        </Svg>
      );
    } else {
      return <Spinner color="blue" />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  }
});

export default Grid;
