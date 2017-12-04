import React, { Component } from "react";
import { UIManager } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import { GRAPH_COOL_EP, COLORS } from "./src/constants";

import AppNavigation from "./src/navigation";

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const link = new HttpLink({ uri: GRAPH_COOL_EP });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={COLORS}>
          <AppNavigation />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
