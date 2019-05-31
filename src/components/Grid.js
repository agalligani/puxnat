import React, { Component } from "react";
import { Constants, Svg } from "expo";
import _ from "lodash";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Container, Content, Body, Spinner } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { squareClick } from "../utils/puzzle";

class Grid extends Component {
  state = {
    puzzleIsEmpty: true,
    width: 0,
    height: 0,
    puzzle: {},
    showNumbers: true,
    showLetters: false,
    clickedSquare: null,
    activeSquare: null,
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

  _squareClick = (puzzle, g, l) => {
    if (puzzle.grid[g] == ".") {
      this.setState({ clickedSquare: null });
    } else {
      // puzzle.grid[g] = "X";
      this.setState({ puzzle: puzzle, clickedSquare: g, activeSquare: g });
      this.ref.focus();
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
    console.log("CWM");
    if (this.props.puzzle.grid) {
      this.setState({ puzzle: this.props.puzzle });
      this.setState({ action: this.props.action });
    }
  };

  render() {
    console.log("render");
    if (this.state.puzzle.grid) {
      let { grid, size, gridnums } = this.state.puzzle;
      let { cols, rows } = size;
      let { width, height } = Dimensions.get("window");
      let action = this.state.action;
      // Adjust for container
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
                let letter = sq;
                let squareFill =
                  index == this.state.activeSquare ? "skyblue" : fill;
                let textElement = (
                  <Svg.Text
                    x={squareWidth * 0.25}
                    y={squareWidth * 0.8}
                    font-family={"Verdana"}
                    fontSize="18px"
                    stroke="blue"
                    fill="grey"
                    strokeWidth=".5"
                    id={"letter" + index}
                    onPress={this._gridSquarePress.bind(this, index, letter)}
                  >
                    {letter}
                  </Svg.Text>
                );

                if (
                  this.state.action == "editGrid" ||
                  grid[index] == "." ||
                  grid[index] == ""
                ) {
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
                      fill={squareFill}
                      onPress={this._gridSquarePress.bind(this, index, letter)}
                    />
                    {letter}
                    <Svg.Text
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
                  </Svg.G>
                );
              })}
            </Svg.G>
          </Svg>
          <TextInput
            id="textStage"
            style={styles.textInput}
            className="textInput"
            ref={ref => (this.ref = ref)}
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
  activeSquare: {
    backgroundColor: "red"
  },
  textInput: {
    backgroundColor: "skyblue",
    height: 20,
    width: 200,
    marginTop: 10
  }
});

export default Grid;
