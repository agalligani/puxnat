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
import PuzzleList from "./PuzzleList";

import { SafeAreaView, StatusBar } from "react-native";
import emptyGrid from "../utils/emptyGrid";

class TabsTest extends React.Component {
  render() {
    return (
      <Container>
        <StatusBar translucent={false} barStyle="dark-content" />
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("Home")}
            >
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
            <PuzzleList />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>No Icon</Text>
              </TabHeading>
            }
          >
            <PuzzleList />
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Icon name="apps" />
              </TabHeading>
            }
          >
            <PuzzleList />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default TabsTest;
