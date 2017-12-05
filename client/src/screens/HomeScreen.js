import React, { Component } from "react";
import styled from "styled-components/native";
import Touchable from "@appandflow/touchable";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ActivityIndicator, FlatList } from "react-native";
import PostCard from "../components/PostCard";

export const allPostsQuery = gql`
  query {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
      createdAt
    }
  }
`;

const RootView = styled.View`
  flex: 1;
  padding-top: 5;
`;

class HomeScreen extends Component {
  state = {
    user: undefined
  };

  _renderItem = ({ item }) => <PostCard {...item} />;

  _createPost = () => this.setState({ modalVisible: true });

  _subscribeToNewPosts = () => {
    this.props.allPostsQuery.subscribeToMore({
      document: gql`
        subscription {
          Post(filter: { mutation_in: [CREATED] }) {
            node {
              id
              description
              imageUrl
              createdAt
            }
          }
        }
      `,
      updateQuery: (previous, { subscriptionData }) => {
        const newAllPosts = [
          subscriptionData.data.Post.node,
          ...previous.allPosts
        ];
        const result = {
          ...previous,
          allPosts: newAllPosts
        };
        return result;
      }
    });
  };

  componentDidMount() {
    this._subscribeToNewPosts();
  }

  render() {
    const { allPostsQuery } = this.props;

    if (allPostsQuery.loading) {
      return (
        <RootView>
          <ActivityIndicator size="large" />
        </RootView>
      );
    }

    return (
      <RootView>
        <FlatList
          contentContainerStyle={{ alignSelf: "stretch" }}
          data={allPostsQuery.allPosts}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
        />
      </RootView>
    );
  }
}

export default graphql(allPostsQuery, { name: "allPostsQuery" })(HomeScreen);