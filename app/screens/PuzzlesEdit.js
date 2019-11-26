import React from "react";
import {
  Container,
  Header,
  Body,
  Button,
  Right,
  Left,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  Title
} from "native-base";
import { PuzzleList } from "../components/PuzzleList";
import { SafeAreaView, StatusBar } from "react-native";

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
            <Button transparent onPress={() => navigation.navigate("GridList")}>
              <Icon name="ios-add" />
            </Button>
          </Right>
        </Header>
        <Tabs>
          <Tab
            heading={
              <TabHeading>
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
