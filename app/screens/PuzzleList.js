import React from "react";
import { AsyncStorage } from "react-native";
import {
  Body,
  Container,
  Content,
  Text,
  List,
  ListItem,
  Fab,
  Icon
} from "native-base";

export default class PuzzleList extends React.Component {
  static navigationOptions = {
    title: "Puzzles",
    headerStyle: {
      backgroundColor: "#ccc"
    },
    headerTitleStyle: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "600"
    }
  };

  state = { allPuzzles: [], clickedPuzzle: {}, savedPuzzles: [] };

  _handleCreatePuzzlePress = g => {
    console.log("OK");
  };

  _handleEditPuzzlePress = p => {
    this.setState({ clickedPuzzle: { zygote: "b" } });
    // console.log("p-list", p);
    this.props.navigation.navigate("EditPuzzle", {
      currentGrid: p,
      puzzles: this.state.allPuzzles,
      savePuzzleById: async puzzle => {
        await this._removePuzzle(puzzle);
        this.setState({
          allPuzzles: this.state.allPuzzles.concat({
            name: puzzle.name,
            id: puzzle.id,
            puzzle: puzzle.puzzle
          })
        });
        await AsyncStorage.setItem(
          "allPuzzles",
          JSON.stringify(this.state.allPuzzles)
        );
      }
    });
  };

  _removePuzzle = async p => {
    try {
      await this.setState({
        allPuzzles: this.state.allPuzzles.filter(puzz => p.id !== puzz.id)
      });
      await AsyncStorage.setItem(
        "allPuzzles",
        JSON.stringify(this.state.allPuzzles)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  componentWillMount = async () => {
    try {
      const savedPuzzles = await AsyncStorage.getItem("allPuzzles");
      if (savedPuzzles !== null) {
        this.setState({
          allPuzzles: JSON.parse(savedPuzzles)
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
            {this.state.allPuzzles.map(puzzle => {
              if (puzzle !== null) {
                return (
                  <ListItem
                    key={puzzle.id}
                    onPress={this._handleEditPuzzlePress.bind(this, puzzle)}
                  >
                    <Body>
                      <Text>
                        {puzzle.name}
                        {/* {grid.grid.size.cols}x{grid.grid.size.rows} */}
                      </Text>
                    </Body>
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
          onPress={this._handleEditPuzzlePress.bind(this)}
        >
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}
