import React from "react";
import {
  Button,
  Container,
  Header,
  Body,
  Right,
  Left,
  Footer,
  FooterTab,
  Icon,
  Text,
  Title,
  Content
} from "native-base";

import PuzzleList from "../components/PuzzleList";
import { SafeAreaView, StatusBar } from "react-native";
import emptyGrid from "../utils/emptyGrid";
import CreatePuzzle from "./CreatePuzzle";

class PuzzleFill extends React.Component {
  state = {
    activeFooterTab: 0
  };

  footerButtonPress = tab => {
    // 0 is Grid view 1 is Clue view
    this.setState({ activeFooterTab: tab });
  };

  render() {
    const { navigation } = this.props;
    const { puzzleView } = this.props.navigation.state.params;

    return (
      <Container>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Header>
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
        </Header>
        <Content>
          <CreatePuzzle {...this.props} />
        </Content>
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
