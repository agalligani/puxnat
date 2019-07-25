import React, { Component } from "react";
import { SafeAreaView, StatusBar, Text, Button } from "react-native";
import styles from "./styles";

class BuildMenu extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Text style={{ fontSize: 30 }}>Build Puzzle</Text>
        <Button
          onPress={() => this.props.navigation.navigate("ChooseAGrid")}
          title="Create A Puzzle"
        />
        <Button
          onPress={() => this.props.navigation.navigate("PuzzleList")}
          title="Edit A Puzzle"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Continue Editing Puzzle 1234"
        />
        <Button onPress={() => this.props.navigation.goBack()} title="Cancel" />
      </SafeAreaView>
    );
  }
}

export default BuildMenu;
