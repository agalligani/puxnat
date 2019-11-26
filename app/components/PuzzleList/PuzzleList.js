import React from "react";
import { AsyncStorage } from "react-native";
import {
  Container,
  Header,
  Separator,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import { GridThumbnail } from "../GridThumbnail";

export default class PuzzleList extends React.Component {
  state = { allPuzzles: [], clickedPuzzle: {}, savedPuzzles: [] };

  _handleEditPuzzlePress = p => {
    this.props.navigation.navigate("PuzzleFill", {
      currentGrid: p,
      newPuzzle: false,
      puzzleView: "Grid",
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
        <Content>
          <Separator bordered>
            <Text>15x15</Text>
          </Separator>
          <List>
            {this.state.allPuzzles.map(puzzle => {
              if (puzzle !== null) {
                return (
                  <ListItem
                    thumbnail
                    large
                    key={puzzle.id}
                    onPress={this._handleEditPuzzlePress.bind(this, puzzle)}
                  >
                    <Left>
                      <GridThumbnail puzzle={puzzle.puzzle} />
                    </Left>
                    <Body>
                      <Text>
                        {puzzle.puzzle.size.cols}x{puzzle.puzzle.size.rows}
                        {/* {puzzle.puzzle.grid} */}
                        {/* {grid.grid.size.cols}x{grid.grid.size.rows} */}
                      </Text>
                      <Text note numberOfLines={1}>
                        Important puzzle info....
                      </Text>
                    </Body>
                    <Right>
                      <Button transparent>
                        <Text>View</Text>
                      </Button>
                    </Right>
                  </ListItem>
                );
              }
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
