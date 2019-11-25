import React from "react";
import {
  Container,
  Header,
  Body,
  Button,
  Right,
  View,
  Left,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Title
} from "native-base";
import PuzzleList from "../components/PuzzleList";

import { SafeAreaView, StatusBar } from "react-native";
import emptyGrid from "../utils/emptyGrid";

class PuzzlesEdit extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Header>
          <Left>
            <Button transparent onPress={() => navigation.navigate("Home")}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Puzzles</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
                {/* <Icon name="camera" /> */}
                <Text>In Progress</Text>
              </TabHeading>
            }
          >
            <PuzzleList navigation={navigation} />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Completed</Text>
              </TabHeading>
            }
          >
            <PuzzleList navigation={navigation} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default PuzzlesEdit;
