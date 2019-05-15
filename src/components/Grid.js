import React, { Component } from "react";
import { Constants, Svg } from "expo";
import _ from "lodash";
import { StyleSheet, Dimensions, Alert } from "react-native";
import { Container, Content, Spinner } from "native-base";

class Grid extends Component {
  state = {
    puzzleIsEmpty: true,
    width: 0,
    height: 0,
    puzzle: {},
    showNumbers: true,
    showLetters: false
  };

  _gridSquarePress = g => {
    console.log("HERE!!!!!", g);
    let { puzzle } = this.state;
    puzzle.grid[g] = ".";
    this.setState({ puzzle: puzzle });
  };

  componentWillMount = _ => {
    if (this.props.puzzle.grid) {
      this.setState({ puzzle: this.props.puzzle });
    }
  };

  render() {
    if (this.state.puzzle.grid) {
      let { grid, size } = this.state.puzzle;
      let { cols, rows } = size;
      let { width } = Dimensions.get("window");
      // Adjust for Native Base container?
      width = width - 32;
      return (
        <Svg height={width} width={width}>
          <Svg.G fill="white" stroke="green" stroke-width="5">
            {this.props.puzzle.grid.map((sq, index) => {
              let squareWidth = width / cols;
              let height = squareWidth;
              let x = index % cols;
              let posx = x * squareWidth;
              let y = Math.floor(index / cols);
              let posy = y * height;
              let fill = sq === "." ? "#111111" : "#ffffff";

              return (
                <Svg.Rect
                  key={index}
                  x={posx}
                  y={posy}
                  width={squareWidth}
                  height={squareWidth}
                  strokeWidth={1}
                  stroke="#111111"
                  fill={fill}
                  onPress={this._gridSquarePress.bind(this, index)}
                  style={{ backgroundColor: "red", padding: 0 }}
                />
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
