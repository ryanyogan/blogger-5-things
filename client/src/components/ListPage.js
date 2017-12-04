import React, { Component } from "react";
import styled from "styled-components/native";
import Touchable from "@appandflow/touchable";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { ActivityIndicator, FlatList } from "react-native";
import PostCard from "./PostCard";
import CreatePage from "./CreatePage";

const allPostsQuery = gql`
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

const Modal = styled.Modal``;

const CreateButtonContainer = styled(Touchable).attrs({
  feedback: "opacity"
})`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10;
  bottom: 10;
  height: 50;
  width: 50;
  border-radius: 25;
  background-color: rgba(39, 174, 96, 1);
  z-index: 1;
  shadow-opacity: 0.4;
  shadow-radius: 5;
  shadow-offset: 0px 2px;
  shadow-color: #000;
`;

const CreateButtonText = styled.Text`
  color: #fff;
  font-size: 24;
  font-weight: 500;
`;

class ListPage extends Component {
  state = {
    modalVisible: false,
    user: undefined
  };

  _renderItem = ({ item }) => <PostCard {...item} />;

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
          <CreateButtonText>+</CreateButtonText>
        </CreateButtonContainer>
      </RootView>
    );
  }
}

export default graphql(allPostsQuery, { name: "allPostsQuery" })(ListPage);
