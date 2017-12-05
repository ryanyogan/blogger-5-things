import React, { Component } from "react";
import { UIManager } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  split
} from "apollo-client-preset";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { GRAPH_COOL_EP, GRAPH_COOL_SUB_EP, COLORS } from "./src/constants";

import AppNavigation from "./src/navigation";

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const wsLink = new WebSocketLink({
  uri: GRAPH_COOL_SUB_EP,
  options: {
    reconnect: true
  }
});

const httpLink = new HttpLink({ uri: GRAPH_COOL_EP });

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

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
