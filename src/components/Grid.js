import React, { Component } from "react";
import { Constants, Svg } from "expo";
import _ from "lodash";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Container, Content, Body, Spinner } from "native-base";
import { TextInput } from "react-native-gesture-handler";

class Grid extends Component {
  state = {
    puzzleIsEmpty: true,
    width: 0,
    height: 0,
    puzzle: {},
    showNumbers: true,
    showLetters: false,
    clickedSquare: null,
    action: "editGrid"
  };

  _gridSquarePress = (g, l) => {
    let { puzzle } = this.state;
    if (this.state.action == "editGrid") {
      puzzle.grid[g] = puzzle.grid[g] == "." ? "" : ".";
      this._gridRenumber();
    } else {
      this._squareClick(puzzle, g, l);
    }
  };

  _squareClick = (p, g, l) => {
    if (p.grid[g] == ".") {
      this.setState({ clickedSquare: null });
    } else {
      this.setState({ clickedSquare: g });
    }
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
      this.setState({ action: this.props.action });
    }
  };

  render() {
    // console.log("grid", this.state.puzzle);
    if (this.state.puzzle.currentGrid) {
      console.log("OY");
    }
    if (this.state.puzzle.grid) {
      let { grid, size, gridnums } = this.state.puzzle;
      let { cols, rows } = size;
      let { width, height } = Dimensions.get("window");
      let action = this.state.action;
      // Adjust for Native Base container?
      width = width - 32;
      return (
        <Body>
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
                let letter = null;
                let textElement = (
                  <Svg.Text
                    x="7"
                    y={squareWidth - 4}
                    font-family={"Verdana"}
                    fontSize="18px"
                    stroke="blue"
                    fill="grey"
                    strokeWidth=".5"
                    id="letter"
                    textContent={letter}
                  >
                    n
                  </Svg.Text>
                );

                if (this.state.action == "editGrid" || grid[index] == ".") {
                  letter = null;
                } else {
                  letter = textElement;
                }

                return (
                  <Svg.G x={posx} y={posy} key={index} tabIndex="0">
                    <Svg.Rect
                      width={squareWidth}
                      height={squareWidth}
                      strokeWidth={1}
                      stroke="#111111"
                      fill={fill}
                      onPress={this._gridSquarePress.bind(this, index, letter)}
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
                      id="gridNum"
                    >
                      {gridNum}
                    </Svg.Text>
                    {letter}
                  </Svg.G>
                );
              })}
            </Svg.G>
          </Svg>
          <TextInput
            style={{
              backgroundColor: "#DDDDDD",
              height: 20,
              width: 200,
              marginTop: 10
            }}
          />
        </Body>
      );
    } else {
      let { width, height } = Dimensions.get("window");
      return (
        <Body>
          <Spinner color="blue" style={{ marginTop: height / 3 }} />
        </Body>
      );
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
  },
  SvgText: {
    backgroundColor: "red"
  }
});

export default Grid;
