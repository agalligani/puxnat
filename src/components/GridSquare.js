import React, { Component } from "react";
import { Constants, Svg } from "expo";

export default class GridSquare extends Component {
  state = {
    width: 40,
    height: 40
  };

  handleKeyPress = event => {
    this.props.handleKeyPress(event);
  };

  handleGridClick = () => {
    let { index } = this.props;
    this.props.gridClick(index);
  };

  buildSquare = () => {
    const { height, width } = this.state;
    const { id, posx, posy, gridnum, squareLetter } = this.props;

    return (
      <Svg.G
        id={id}
        onClick={this.handleGridClick}
        onKeyPress={this.handleKeyPress}
        tabIndex="0"
      >
        <Svg.Rect
          value={posx}
          className={this.props.classs}
          x={posx}
          y={posy}
          width={width}
          height={height}
        />
        <Svg.Text x={posx + 2} y={posy + 13} id="clue1">
          {gridnum === 0 ? null : gridnum}
        </Svg.Text>
        {/* <a xlink href="#0"> */}
        <Svg.Text
          className="inputText"
          x={posx + 20}
          y={posy + 35}
          textAnchor="middle"
        >
          {squareLetter}
        </Svg.Text>
        {/* </a> */}
      </Svg.G>
    );
  };

  render() {
    return this.buildSquare();
  }
}
