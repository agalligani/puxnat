import React, { Component } from "react";
import { View, TouchableOpacity, StatusBar, Text, Button } from "react-native";

class BuildMenu extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Text style={{ fontSize: 30 }}>Build Puzzle</Text>
        <Button
          onPress={() => this.props.navigation.navigate("ChooseAGrid")}
          title="Create A New Puzzle"
        />
        <Button
          onPress={() => this.props.navigation.navigate("PuzzleList")}
          title="Edit An Existing Puzzle"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Continue Work On Puzzle 1234"
        />
        <Button onPress={() => this.props.navigation.goBack()} title="Cancel" />
      </View>
    );
  }
}

export default BuildMenu;
