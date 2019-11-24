import React, { Component } from "react";
import { View, StatusBar, Button } from "react-native";
import { Container } from "../components/Container";
import { Logo } from "../components/Logo";

class Home extends Component {
  handleBuildPress = () => {
    // this.props.navigation.navigate("BuildMenu");
    this.props.navigation.navigate("PuzzlesEdit");
  };

  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="light-content" />
        <View>
          <Logo />
          <Button title={"Build Puzzles"} onPress={this.handleBuildPress} />
        </View>
      </Container>
    );
  }
}

export default Home;
