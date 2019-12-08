import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";

export default class Answers extends Component {
  render() {
    return this.props.answers.map((answer, i) => {
      return (
        <TouchableOpacity key={i} style={styles.container}>
          {answer.split("").map((a, i) => {
            return (
              <Text key={i} style={styles.answerLetter}>
                {a}
              </Text>
            );
          })}
        </TouchableOpacity>
      );
    });
  }
}
