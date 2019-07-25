import React, { Component } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import styles from "../styles";
import PropTypes from "prop-types";
import navigation from "react-navigation";

class GridTypeItem extends Component {
  handlePress = (w, h) => {
    this.props.navigation.navigate("CreateGrid");
  };
  render() {
    const { width, height, navigate } = this.props;
    return (
      <TouchableHighlight onPress={() => navigate("GridList")}>
        <View style={styles.gridBox}>
          <Text style={styles.gridBoxText}>
            {width} X {height}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default GridTypeItem;
