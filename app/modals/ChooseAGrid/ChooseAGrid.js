import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Text,
  Button
} from "react-native";
import GridTypeItem from "./GridTypeItem";
import styles from "../styles";

class ChooseAGrid extends React.Component {
  handlePress = () => {
    alert("hi");
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar translucent={false} barStyle="dark-content" />
        <View style={styles.titleRegion}>
          <Text style={styles.title}>Puzzle Size</Text>
          <Text style={styles.subtitle}>
            Select the Size of the Grid for your Puzzle. All Available Grid
            Sizes are Symmetrical yielding Square Puzzles.
          </Text>
        </View>
        <View style={styles.gridRegion}>
          <View style={styles.gridRow}>
            <GridTypeItem navigate={navigate} width={25} height={25} />
            <GridTypeItem navigate={navigate} width={23} height={23} />
            <GridTypeItem navigate={navigate} width={15} height={15} />
          </View>
          <View style={styles.gridRow}>
            <GridTypeItem navigate={navigate} width={14} height={14} />
            <GridTypeItem navigate={navigate} width={12} height={12} />
            <GridTypeItem navigate={navigate} width={10} height={10} />
          </View>
          <View style={styles.gridRow}>
            <GridTypeItem onPress={this.handlePress} width={23} height={23} />
            <GridTypeItem onPress={this.handlePress} width={15} height={15} />
            <GridTypeItem onPress={this.handlePress} width={14} height={14} />
          </View>
        </View>
        <View style={styles.footRegion}>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Cancel"
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default ChooseAGrid;
