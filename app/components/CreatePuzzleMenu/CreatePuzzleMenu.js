import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from "react-native";

import { Badge, Avatar } from "react-native-elements";
import styles from "./styles";
import * as Font from "expo-font";
// import { FontAwesome } from "@expo/vector-icons";

export default class CreatePuzzleMenu extends Component {
  render() {
    return (
      <View style={styles.menuContainer}>
        <Text style={styles.muliText20}>Add a New Puzzle</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Badge value="DAILY" />
          <Text>15X15</Text>
          <View>
            <Avatar
              source={{
                uri: "https://randomuser.me/api/portraits/men/41.jpg"
              }}
              size="large"
            />

            <Badge
              status="success"
              containerStyle={{ position: "absolute", top: -4, right: -4 }}
              value="Silly"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
