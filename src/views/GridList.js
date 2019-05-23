import React from "react";
import { AsyncStorage, StyleSheet, Alert, ScrollView } from "react-native";
import {
  Header,
  Left,
  Button,
  Body,
  Container,
  Content,
  Right,
  Title,
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
    grids: [],
    newGridsList: [],
    gridsInList: [],
    currentGrid: {}
  };

  _handleCreateGridPress = g => {
    let newGrid = {};
    newGrid = emptyGrid(15, 15);
    this.setState({ currentGrid: newGrid });
    this.props.navigation.navigate("CreateGrid", {
      saveGrid: grid => {
        this.setState({ grids: this.state.grids.concat(grid) });
      },
      newGrid: newGrid,
      gridsInList: this.state.grids,
      currentGrid: this.state.currentGrid,
      action: "editGrid"
    });
  };

  _handleEditGridPress = clickedGrid => {
    this.setState({ clickedGrid: clickedGrid });
    this.props.navigation.navigate("CreateGrid", {
      saveGridById: async grid => {
        await this._removeGrid(grid);
        this.setState({
          grids: this.state.grids.concat({
            name: grid.id,
            id: grid.id,
            grid: grid
          })
        });
        console.log(this.state.grids);
        await AsyncStorage.setItem(
          "allGrids",
          JSON.stringify(this.state.grids)
        );
      },
      clickedGrid: clickedGrid,
      currentGrid: this.state.clickedGrid,
      newGrid: false
    });
  };

  _removeGrid = async g => {
    try {
      await this.setState({
        grids: this.state.grids.filter(grid => g.id !== grid.id)
      });
      await AsyncStorage.setItem("allGrids", JSON.stringify(this.state.grids));
    } catch (error) {
      console.log(error.message);
    }
  };

  componentWillMount = async () => {
    try {
      const savedGrids = await AsyncStorage.getItem("allGrids");
      if (savedGrids !== null) {
        this.setState({
          grids: JSON.parse(savedGrids)
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
        <Content
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between"
          }}
        >
          <List>
            {this.state.grids.map(grid => {
              if (grid !== null) {
                return (
                  <ListItem
                    key={grid.id}
                    onPress={this._handleEditGridPress.bind(this, grid)}
                  >
                    <Body>
                      <Text>
                        {grid.name}
                        {/* {grid.grid.size.cols}x{grid.grid.size.rows} */}
                      </Text>
                    </Body>
                    <Right>
                      <Icon
                        ios="ios-remove-circle"
                        android="md-remove-circle"
                        style={{ color: "red" }}
                        onPress={this._removeGrid.bind(this, grid)}
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
