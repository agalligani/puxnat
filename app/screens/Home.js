import React from "react";
import { View, Text, StatusBar } from "react-native";
import { Container } from "../components/Container";

export default () => (
  <Container>
    <StatusBar translucent={false} barStyle="light-content" />
    <View>
      <Text>PUXXLER</Text>
    </View>
  </Container>
);
