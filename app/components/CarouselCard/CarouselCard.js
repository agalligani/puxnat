import React, { Component } from "react";
import { SafeAreaView, View } from "react-native";
import PuzzleButtons from "./PuzzleButtons";
import PropTypes from "prop-types";
import styles from "./styles";
import { GridThumbnail } from "../GridThumbnail";
import { Card, Badge, ButtonGroup, Divider } from "react-native-elements";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

export default class CarouselCard extends Component {
  state = {
    cardWidth: 0,
    gridWidth: 0,
    puzzle: {}
  };

  componentDidMount = _ => {
    this.setState({ cardWidth: this.props.componentWidth });
    this.setState({ puzzle: this.props.puzzle });
    this.setState({ gridWidth: this.props.componentWidth / 1.5 });
  };

  render() {
    return (
      <SafeAreaView>
        <View
          style={{ width: this.props.componentWidth, alignItems: "center" }}
        >
          <Card title="Puzzle">
            {/* <Text>{this.props.puzzle.grid}</Text> */}
            <GridThumbnail
              puzzle={this.props.puzzle}
              width={this.props.gridWidth}
            />
          </Card>
        </View>
        <Divider style={styles.divider} />
      </SafeAreaView>
    );
  }
}
