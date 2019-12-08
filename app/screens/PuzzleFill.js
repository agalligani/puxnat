import React from "react";
import {
  Button,
  Container,
  Footer,
  FooterTab,
  Text,
  Content
} from "native-base";
import { Answers } from "../components/Answers";
import { SafeAreaView, StatusBar, View } from "react-native";
import CreatePuzzle from "./CreatePuzzle";

class PuzzleFill extends React.Component {
  state = {
    activeFooterTab: 0
  };

  footerButtonPress = tab => {
    // 0 is Grid view 1 is Clue view
    this.setState({ activeFooterTab: tab });
  };

  gridCluesToggleFunction = props => {
    if (this.state.activeFooterTab == 0) {
      return (
        <Content>
          {/* CreatePuzzle should probably be renamed FillPuzzleGrid */}
          {/* Also passing props doesn't make sense... should only pass current puzzle */}
          {/* See {Object.keys(props.navigation.state.params.puzzles).join(",")} */}
          <CreatePuzzle {...props} />
        </Content>
      );
    } else {
      return (
        <Content>
          {/* CreatePuzzle should probably be renamed FillPuzzleGrid */}
          <View>
            <Text>Across</Text>
            <Answers
              answers={
                props.navigation.state.params.currentGrid.puzzle.answers.across
              }
            />

            <Text>Down</Text>
            <Answers
              answers={
                props.navigation.state.params.currentGrid.puzzle.answers.down
              }
            />
            {/* {props.navigation.state.params.currentGrid.puzzle.answers.across.join(
              ","
            )}
            {props.navigation.state.params.currentGrid.puzzle.answers.down.join(
              ","
            )} */}
          </View>
        </Content>
      );
    }
  };

  render() {
    const { navigation } = this.props;
    const { puzzleView } = this.props.navigation.state.params;

    return (
      <Container>
        <StatusBar translucent={false} barStyle="dark-content" />
        {/* <Header>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Edit Puzzle</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="ios-save" />
            </Button>
          </Right>
        </Header> */}
        {this.gridCluesToggleFunction(this.props)}

        <Footer>
          <FooterTab>
            <Button
              active={this.state.activeFooterTab == 0}
              onPress={() => {
                this.footerButtonPress(0);
              }}
            >
              <Text>Grid</Text>
            </Button>
            <Button
              active={this.state.activeFooterTab == 1}
              onPress={() => {
                this.footerButtonPress(1);
              }}
            >
              <Text>Clues</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default PuzzleFill;
