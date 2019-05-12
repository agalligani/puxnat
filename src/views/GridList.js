import React from "react";
import { AsyncStorage, StyleSheet, Alert } from "react-native";
import {
  Body,
  Container,
  Content,
  Right,
  Text,
  List,
  ListItem,
  Fab,
  Icon
} from "native-base";
import emptyGrid from "../utils/emptyGrid";

export default class GridList extends React.Component {
  static navigationOptions = {
    title: "Grids",
    headerStyle: {
      backgroundColor: "#ccc"
    },
    headerTitleStyle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "600"
    }
  };

  state = {
    allGrids: [],
    newGridsList: [],
    gridsInList: [],
    currentGrid: {}
  };

  addNewGrid = async name => {
    const newGridsList = this.state.allGrids.concat({
      name: name,
      id: Math.floor(Math.random() * 100000)
    });
    try {
      await AsyncStorage.setItem("allGrids", JSON.stringify(newGridsList));
    } catch (error) {
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
    this.setState({ allGrids: newGridsList });
  };

  _handleCreateGridPress = g => {
    let newGrid = {};
    newGrid = emptyGrid(15, 15);
    this.setState({ currentGrid: newGrid });
    this.props.navigation.navigate("CreateGrid", {
      addGrid: grid => {
        this.setState({ allGrids: this.state.products.concat(grid) });
      },
      newGrid: newGrid,
      gridsInList: this.state.allGrids,
      currentGrid: this.state.currentGrid
    });
  };

  _handleEditGridPress = clickedGrid => {
    this.setState({ clickedGrid: clickedGrid });
    this.props.navigation.navigate("CreateGrid", {
      clickedGrid: clickedGrid,
      currentGrid: this.state.clickedGrid,
      newGrid: false
    });
  };

  componentWillMount = async () => {
    try {
      const savedGrids = await AsyncStorage.getItem("allGrids");
      if (savedGrids !== null) {
        this.setState({
          allGrids: JSON.parse(savedGrids)
        });
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            {this.state.allGrids.map(grid => {
              if (grid.grid) {
                return (
                  <ListItem
                    key={grid.id}
                    onPress={this._handleEditGridPress.bind(this, grid)}
                  >
                    <Body>
                      <Text>
                        {grid.grid.size.cols}x{grid.grid.size.rows}
                      </Text>
                    </Body>
                    <Right>
                      <Icon
                        ios="ios-remove-circle"
                        android="md-remove-circle"
                        style={{ color: "red" }}
                      />
                    </Right>
                  </ListItem>
                );
              }
            })}
          </List>
        </Content>
        <Fab
          active={false}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: "#5067ff" }}
          position="bottomRight"
          onPress={this._handleCreateGridPress.bind(this)}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
