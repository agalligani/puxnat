import React, { Component } from "react";
import {
  Animated,
  Easing,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions
} from "react-native";

// or any pure javascript modules available in npm
import SideSwipe from "react-native-sideswipe"; // 0.0.6
import { Card, Badge } from "react-native-elements"; // 0.18.5

import "@expo/vector-icons"; // 6.2.2

const { width } = Dimensions.get("window");
const componentWidth = width;
const contentOffset = (width - componentWidth) / 2;
const data = [1, 2, 3, 4, 5];

export default class Carousel extends Component {
  state = {
    currentIndex: 0
  };

  render = () => {
    // center items on screen
    const { width } = Dimensions.get("window");
    const componentWidth = width;
    const contentOffset = (width - componentWidth) / 2;
    const data = [1, 2, 3, 4, 5];

    return (
      <SideSwipe
        index={this.state.currentIndex}
        itemWidth={componentWidth}
        style={{ width }}
        data={data}
        contentOffset={contentOffset}
        onIndexChange={index => this.setState(() => ({ currentIndex: index }))}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
          <SafeAreaView>
            <View style={{ width: componentWidth }}>
              <Card title="Local Modules">
                <Badge value={item} />
                <Text style={{ marginTop: 10 }}>
                  Science has not yet mastered prophecy. We predict too much for
                  the next year and yet far too little for the next 10. I don't
                  know what you could say about a day in which you have seen
                  four beautiful sunsets.
                </Text>
              </Card>
            </View>
          </SafeAreaView>
        )}
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#ecf0f1"
  }
});
