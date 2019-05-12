import React from "react";
import { AsyncStorage, StyleSheet, Alert } from "react-native";
import prompt from "react-native-prompt-android";
import emptyGrid from "../utils/emptyGrid";
import Grid from "../components/Grid";
import {
  Body,
  Container,
  Content,
  List,
  ListItem,
  Fab,
  Icon
} from "native-base";

export default class CreateGrid extends React.Component {
  state = {
    currentGrid: [],
    allGrids: [],
    newGridsList: [],
    gridsInList: [],
    clickedGrid: {}
  };

  addNewGrid = async name => {
    const newGridsList = this.state.allGrids.concat({
      name: name,
      id: Math.floor(Math.random() * 100000),
      grid: this.state.currentGrid
    });
    console.log(Object.keys(newGridsList));
    try {
      await AsyncStorage.setItem("allGrids", JSON.stringify(newGridsList));
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
    this.setState({ allGrids: newGridsList });
    this.props.navigation.state.params.addGrid(newGridsList.slice(-1)[0]);
  };

  _handleCreateGridPress = _ => {
    prompt(
      "Enter Grid Name",
      "",
      [{ text: "Cancel" }, { text: "OK", onPress: this.addNewGrid.bind(this) }],
      {
        type: "plain-text"
      }
    );
  };

  componentDidMount = () => {};

  componentWillMount = async _ => {
    if (this.props.navigation.state.params.clickedGrid) {
      let newGrid = this.props.navigation.state.params.clickedGrid.grid;
      this.setState({ currentGrid: newGrid });
    } else {
      let newGrid = this.props.navigation.state.params.newGrid;
      this.setState({ currentGrid: newGrid });
    }
    try {
      const allGrids = await AsyncStorage.getItem("allGrids");
      if (allGrids !== null) {
        // We have data!!
        this.setState({
          allGrids: JSON.parse(allGrids)
        });
      }
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Body>
            <Grid puzzle={this.state.currentGrid} />
          </Body>
        </Content>
        <Fab
          active={false}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067ff" }}
          position="bottomRight"
          onPress={this._handleCreateGridPress.bind(this)}
        >
          <Icon name="save" />
        </Fab>
      </Container>
    );
  }
}
