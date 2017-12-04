import React, { Component } from "react";
import styled from "styled-components/native";
import Touchable from "@appandflow/touchable";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ActivityIndicator, FlatList } from "react-native";
import Post from "./Post";
import CreatePage from "./CreatePage";

const allPostsQuery = gql`
  query {
    allPosts(orderBy: createdAt_DESC) {
      id
      imageUrl
      description
    }
  }
`;

const RootView = styled.View`
  flex: 1;
  padding-top: 5;
`;

const Modal = styled.Modal``;

const CreateButtonContainer = styled(Touchable).attrs({
  feedback: "opacity"
})`
  justify-content: center;
  align-items: center;
`;

const CreateButtonText = styled.Text`
  background-color: rgba(39, 174, 96, 1);
  color: #fff;
  text-align: center;
  font-size: 22;
  height: 60;
  width: 100%;
  padding-top: 18;
`;

class ListPage extends Component {
  state = {
    modalVisible: false,
    user: undefined
  };

  _renderItem = ({ item }) => <Post {...item} />;

  _createPost = () => this.setState({ modalVisible: true });

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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <CreatePage
            onComplete={() => {
              this.props.allPostsQuery.refetch();
              this.setState({ modalVisible: false });
            }}
          />
        </Modal>

        <FlatList
          contentContainerStyle={{ alignSelf: "stretch" }}
          data={allPostsQuery.allPosts}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
        />

        <CreateButtonContainer onPress={this._createPost}>
          <CreateButtonText>Create Post</CreateButtonText>
        </CreateButtonContainer>
      </RootView>
    );
  }
}

export default graphql(allPostsQuery, { name: "allPostsQuery" })(ListPage);
