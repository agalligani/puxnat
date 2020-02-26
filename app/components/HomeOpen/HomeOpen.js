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

// or any pure javascript modules available in npm
import SideSwipe from "react-native-sideswipe"; // 0.0.6
import { Card, Badge } from "react-native-elements"; // 0.18.5
import "@expo/vector-icons"; // 6.2.2

import styles from "./styles";
import { GridThumbnail } from "../GridThumbnail";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import emptyGrid from "../../utils/emptyGrid";
import { puzzleMeta } from "../PuzzleMeta";
import { Container } from "../Container";

const { width } = Dimensions.get("window");
const componentWidth = width;
const contentOffset = (width - componentWidth) / 2;
const data = [1, 2, 3, 4, 5];

export default class HomeOpen extends Component {
  state = {
    puzzlesEmpty: true,
    allPuzzles: [],
    clickedPuzzle: {},
    savedPuzzles: [],
    currentIndex: 0,
    puzzleKeys: []
  };

  componentDidMount = async () => {
    try {
      const savedPuzzles = await AsyncStorage.getItem("allPuzzles");
      if (savedPuzzles !== null) {
        const actualPuzzles = JSON.parse(savedPuzzles).map(puzzle => {
          if (puzzle.puzzle) return puzzle;
        });
        this.setState({
          puzzlesEmpty: false,
          allPuzzles: actualPuzzles
        });
        console.log(this.state.allPuzzles);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // puzzleMetadata will need to return more interesting visuals

  render() {
    let { height, width } = Dimensions.get("window");
    let gridWidth = width * 0.3;
    if (!this.state.puzzlesEmpty) {
      return (
        <SideSwipe
          index={this.state.currentIndex}
          itemWidth={componentWidth}
          style={{ width }}
          data={this.state.allPuzzles}
          contentOffset={contentOffset}
          onIndexChange={index =>
            this.setState(() => ({ currentIndex: index }))
          }
          renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
            <SafeAreaView>
              <View style={{ width: componentWidth, alignItems: "center" }}>
                <Card title="Puzzle">
                  <Badge value={item.id} />
                  <Text>
                    {item.puzzle.size.cols}x{item.puzzle.size.rows}
                  </Text>
                  <GridThumbnail
                    puzzle={item.puzzle}
                    width={componentWidth / 1.5}
                  />
                </Card>
              </View>
            </SafeAreaView>
          )}
        />
      );
      //   return (
      //     <ScrollView contentContainerStyle={styles.listContainer}>
      //       {this.state.allPuzzles.map(puzzle => {
      //         if (puzzle !== null) {
      //           return (
      //             <TouchableOpacity
      //               key={puzzle.id}
      //               onPress={this._handleEditPuzzlePress.bind(this, puzzle)}
      //               style={styles.touchable}
      //             >
      //               <View style={styles.puzzleView}>
      //                 <GridThumbnail puzzle={puzzle.puzzle} width={gridWidth} />
      //               </View>
      //               <View style={styles.textContainer}>
      //                 <View>
      //                   <Text style={styles.largeText}>
      //                     {puzzle.puzzle.size.cols}x{puzzle.puzzle.size.rows}
      //                   </Text>
      //                 </View>
      //                 <Text style={styles.normalText}>
      //                   {this.puzzleMetadata(puzzle.puzzle.grid)}
      //                 </Text>
      //               </View>
      //             </TouchableOpacity>
      //           );
      //         }
      //       })}
      //     </ScrollView>
      //   );
      // } else {
      //   return (
      //     <View>
      //       <Text>No Puzzles have been created.</Text>
      //       <Button
      //         onPress={this._handleCreateGridPress.bind(this)}
      //         icon={<MaterialIcons name="add-box" size={32} color="#225599" />}
      //         title="Create Your First Puzzle"
      //       />
      //     </View>
      //   );
    } else {
      return (
        <Container>
          <View>
            <Text>No Puzzles have been created.</Text>
            <Button
              onPress={this._handleCreateGridPress.bind(this)}
              icon={<MaterialIcons name="add-box" size={32} color="#225599" />}
              title="Create Your First Puzzle"
            />
          </View>
        </Container>
      );
    }
  }

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

  _createBlankPuzzle = _ => {
    const emptyPuzzle = { puzzle: emptyGrid };
    const currentGrid = { currentGrid: emptyPuzzle };
    this.props.navigation.navigate("CreatePuzzle", {
      savePuzzleById: async currentGrid => {}
    });
  };

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
}
