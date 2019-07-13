import React, { Component } from "react";
import { Constants, Svg } from "expo";
import _ from "lodash";
import { StyleSheet, Dimensions } from "react-native";
import { Body, Spinner } from "native-base";
import { TextInput } from "react-native-gesture-handler";
import { squareClick } from "../../utils/puzzle";
import styles from "./style";

// import { G, Rect, Text } from "react-native-svg";
// import * as Svg from "react-native-svg";

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
    highlitSquares: [],
    action: "editGrid",
    cursorDirection: "across",
    whiteSquares: []
  };

  setCleanSquares = () => {
    let { grid } = this.state.puzzle;
    return grid
      .map((g, i) => [i, g])
      .filter(g => g[1] != ".")
      .map(g => g[0]);
  };

  setCleanSquaresByColumn = () => {
    let { cols } = this.state.puzzle.size;
    let whiteSquares = this.state.whiteSquares;
    return _.range(cols).map(col => {
      let i = whiteSquares.filter(sq => {
        let row = Math.ceil(sq / cols);
        let adjustedForZeroCol = col == 0 ? col + cols : col;
        return cols - (row * cols - sq) == adjustedForZeroCol;
      });
      return i;
    });
  };

  handleKeyPress = async event => {
    let { puzzle, activeSquare } = this.state;
    let letter = "";
    switch (event.nativeEvent.key) {
      case "Backspace":
        this.setNextSquare("backwards");
        letter = "";
        puzzle.grid[activeSquare] = letter;
        await this.setState({ puzzle: puzzle });
        break;
      case "Tab":
        break; //make skip to next clue
      case ".":
        break;
      default:
        letter =
          event.nativeEvent.key == " "
            ? ""
            : event.nativeEvent.key.toUpperCase();
        puzzle.grid[activeSquare] = letter;
        await this.setState({ puzzle: puzzle });
        await this.setNextSquare();
    }
  };

  setNextSquare = async (direction = "forwards") => {
    let { puzzle, activeSquare, cursorDirection } = this.state;
    let { cols, rows } = puzzle.size;

    cleanSquares = this.setCleanSquares();
    await this.setState({ whiteSquares: cleanSquares });

    if (cursorDirection == "across") {
      if (direction == "forwards") {
        nextSquareIndex =
          cleanSquares.length < cleanSquares.indexOf(activeSquare) + 1
            ? 0
            : cleanSquares.indexOf(activeSquare) + 1;
      } else {
        nextSquareIndex =
          cleanSquares.indexOf(activeSquare) - 1 == 0
            ? cleanSquares.length
            : cleanSquares.indexOf(activeSquare) - 1;
      }
      nextSquare = cleanSquares[nextSquareIndex];
    } else {
      let cleanSquaresByColumn = this.setCleanSquaresByColumn();
      let activeSquareRow = Math.ceil(activeSquare / cols);
      let activeSquareCol = cols - (activeSquareRow * cols - activeSquare);
      let activeSquarePosition = cleanSquaresByColumn[activeSquareCol].indexOf(
        activeSquare
      );
      if (direction == "forwards") {
        if (
          activeSquarePosition ==
          cleanSquaresByColumn[activeSquareCol].length - 1
        ) {
          nextSquare = cleanSquaresByColumn[activeSquareCol + 1][0];
        } else {
          nextSquare =
            cleanSquaresByColumn[activeSquareCol][activeSquarePosition + 1];
        }
      } else {
        if (activeSquarePosition == 0) {
          prevColLength = cleanSquaresByColumn[activeSquareCol - 1].length;
          nextSquare =
            cleanSquaresByColumn[activeSquareCol - 1][prevColLength - 1];
        } else {
          nextSquare =
            cleanSquaresByColumn[activeSquareCol][activeSquarePosition - 1];
        }
      }
    }
    if (this.state.cursorDirection == "across") {
      await this.setHighlitSquaresAcross(nextSquare);
    } else {
      await this.setHighlitSquaresDown(nextSquare);
    }
    if (puzzle.grid)
      await this.setState({
        puzzle: puzzle,
        activeSquare: nextSquare
      });
  };

  setHighlitSquaresAcross = async g => {
    let activeSquare = g; // latency issue
    let { puzzle, cursorDirection } = this.state;
    let { rows, cols } = puzzle.size;
    cleanSquares = this.setCleanSquares();
    let start = Math.floor(activeSquare / cols) * cols - 1;
    let stop = Math.ceil(activeSquare / cols) * cols;
    let middlePos = cleanSquares.indexOf(activeSquare);
    if (middlePos == -1) {
      return;
    }
    let highlitSquares = [];
    let nextInSequence = cleanSquares[middlePos] - 1;

    if (activeSquare > start) {
      let i = middlePos;
      do {
        nextInSequence = cleanSquares[i] - 1;
        if (cleanSquares[i] != activeSquare) {
          highlitSquares.push(cleanSquares[i]);
        }
        i = i - 1;
      } while (cleanSquares[i] > start && cleanSquares[i] == nextInSequence);
    }

    nextInSequence = activeSquare + 1;
    if (activeSquare < stop) {
      let i = middlePos;
      do {
        nextInSequence = cleanSquares[i] + 1;
        if (cleanSquares[i] != activeSquare) {
          highlitSquares.push(cleanSquares[i]);
        }
        i = i + 1;
      } while (cleanSquares[i] < stop && cleanSquares[i] == nextInSequence);
    }
    await this.setState({ highlitSquares: highlitSquares });
  };

  setHighlitSquaresDown = async g => {
    let activeSquare = g; // latency issue
    let { rows, cols } = this.state.puzzle.size;
    cleanSquares = this.setCleanSquares();
    this.setState({ whiteSquares: cleanSquares });
    let whiteSquaresByColumn = this.setCleanSquaresByColumn();
    let activeSquareRow = Math.ceil(activeSquare / cols);
    let activeSquareCol = cols - (activeSquareRow * cols - activeSquare);
    let start = activeSquareCol; //start is first square in col
    let stop = rows * cols - activeSquareCol;
    let middlePos = whiteSquaresByColumn[activeSquareCol].indexOf(activeSquare);
    if (middlePos == -1) {
      return;
    }
    let highlitSquares = [];
    let nextInSequence =
      whiteSquaresByColumn[activeSquareCol][middlePos] - cols;

    if (activeSquare > start) {
      let i = middlePos;
      do {
        nextInSequence = whiteSquaresByColumn[activeSquareCol][i] - cols;
        if (whiteSquaresByColumn[activeSquareCol][i] != activeSquare) {
          highlitSquares.push(whiteSquaresByColumn[activeSquareCol][i]);
        }
        i = i - 1;
      } while (
        whiteSquaresByColumn[activeSquareCol][i] >= start &&
        whiteSquaresByColumn[activeSquareCol][i] == nextInSequence
      );
    }

    nextInSequence = activeSquare + cols;

    if (activeSquare < stop) {
      let i = middlePos;
      do {
        nextInSequence = whiteSquaresByColumn[activeSquareCol][i] + cols;
        if (whiteSquaresByColumn[activeSquareCol][i] != activeSquare) {
          highlitSquares.push(whiteSquaresByColumn[activeSquareCol][i]);
        }
        i = i + 1;
      } while (
        whiteSquaresByColumn[activeSquareCol][i] < stop + cols &&
        whiteSquaresByColumn[activeSquareCol][i] == nextInSequence
      );
    }
    await this.setState({ highlitSquares: highlitSquares });
  };

  _gridSquarePress = (g, l) => {
    let { puzzle } = this.state;
    if (this.state.action == "editGrid") {
      puzzle.grid[g] = puzzle.grid[g] == "." ? "" : ".";
      this._gridRenumber();
    } else {
      this._puzzleClick(puzzle, g, l);
    }
  };

  _puzzleClick = async (puzzle, g, l) => {
    if (puzzle.grid[g] == ".") {
      await this.setState({
        clickedSquare: null,
        activeSquare: null,
        highlitSquares: []
      });
    } else {
      if (g == this.state.activeSquare) {
        let cursorDirection =
          this.state.cursorDirection == "across" ? "down" : "across";
        await this.setState({ cursorDirection: cursorDirection });
      }
      await this.setState({
        puzzle: puzzle,
        // clickedSquare: g,
        activeSquare: g
      });
      if (this.state.cursorDirection == "across") {
        this.setHighlitSquaresAcross(g);
      } else {
        this.setHighlitSquaresDown(g);
      }
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
    if (this.props.puzzle.grid) {
      this.setState({ puzzle: this.props.puzzle });
      this.setState({ action: this.props.action });
    }
  };

  render() {
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
            <Svg.G fill="white" stroke-width="5">
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
                  index == this.state.activeSquare ? "#ffdd00" : fill;
                squareFill =
                  this.state.highlitSquares.indexOf(index) > -1
                    ? "#fff155"
                    : squareFill;
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
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyDown}
            autoCorrect={false}
            autoComplete={false}
            // autoCompleteType={cc-number}
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

export default Grid;
