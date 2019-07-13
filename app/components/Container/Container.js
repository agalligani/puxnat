import React from "react";
import { View } from "react-native";
import styles from "./styles";
import PropTypes from "prop-types";

const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

Container.propTypes = {
  childen: PropTypes.element
};

export default Container;
