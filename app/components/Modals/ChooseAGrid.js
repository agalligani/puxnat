import React, { Component } from "react";
import { View, TouchableOpacity, StatusBar, Text, Button } from "react-native";

class ChooseAGrid extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Text style={{ fontSize: 30 }}>Puzzle Size</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
            width: 260
          }}
        >
          Select the Size of the Grid for your Puzzle. All Available Grid Sizes
          are Symmetrical yielding Square Puzzles.
        </Text>
        <Button onPress={() => this.props.navigation.goBack()} title="Cancel" />
      </View>
    );
  }
}

export default ChooseAGrid;
