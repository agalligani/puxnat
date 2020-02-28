import React, { Component } from "react";
import { ButtonGroup } from "react-native-elements";
import FontAwesome from "@expo/vector-icons";

export default class PuzzleButtons extends Component {
  render() {
    let happyPink = "#dd669C";
    let buttons = [
      <FontAwesome
        name="pencil"
        size={30}
        color={happyPink}
        onPress={() => console.log(this.state.currentIndex)}
      />,
      <FontAwesome name="share-square-o" size={30} color={happyPink} />,
      <FontAwesome name="upload" size={30} color={happyPink} />,
      <FontAwesome name="gear" size={30} color={happyPink} />,
      <FontAwesome
        name="trash-o"
        size={30}
        onPress={this._removePuzzle.bind(this)}
        color={happyPink}
      />
    ];
    return (
      <ButtonGroup
        // onPress={this.updateIndex}
        // selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          height: 40,
          marginTop: 2,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0
        }}
      />
    );
  }
}
