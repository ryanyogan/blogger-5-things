import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import ListPage from "./src/components/ListPage";
import { GRAPH_COOL_EP, COLORS } from "./src/constants";

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
          <ListPage />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
