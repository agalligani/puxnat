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
import { Card, Badge, ButtonGroup, Divider } from "react-native-elements"; // 0.18.5
import styles from "./styles";
import * as Font from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

import SideSwipe from "react-native-sideswipe";
import { CarouselCard } from "../CarouselCard";
import { GridThumbnail } from "../GridThumbnail";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import emptyGrid from "../../utils/emptyGrid";
import { puzzleMeta } from "../PuzzleMeta";
import { Container } from "../Container";
import { CreatePuzzleMenu } from "../CreatePuzzleMenu";

const { width } = Dimensions.get("window");
const componentWidth = width;
const contentOffset = (width - componentWidth) / 2;

export default class HomeOpen extends Component {
  state = {
    puzzlesEmpty: true,
    allPuzzles: [],
    clickedPuzzle: {},
    savedPuzzles: [],
    currentIndex: 0,
    puzzleKeys: [],
    fontLoaded: true
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      "muli-bold": require("../../../assets/fonts/Muli-Bold.ttf")
    });

    this.setState({ fontLoaded: true });

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
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    let { height, width } = Dimensions.get("window");
    let happyPink = "#dd669C";
    let puzzleButtons = [
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

    _updateIndex = () => {
      console.log("");
    };

    if (!this.state.puzzlesEmpty) {
      return (
        <Container>
          <Text style={styles.muliText}>This should be Muli text.</Text>
          <Text>De que que?</Text>
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
              <CarouselCard
                componentWidth={componentWidth}
                gridWidth={componentWidth / 1.5}
                puzzle={item.puzzle}
              />
            )}
          />
          <CreatePuzzleMenu></CreatePuzzleMenu>
        </Container>
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
