import React, { Component } from "react";
import { View, Button } from "react-native";
import PropTypes from "prop-types";
import Navigation from "../../config/routes";

class HomeScreenMenu extends Component {
  render() {
    return (
      <View>
        <Button
          title={"Build"}
          // onPress={this.props.navigation.navigate("GridList")}
        />
      </View>
    );
  }
}
export default HomeScreenMenu;
