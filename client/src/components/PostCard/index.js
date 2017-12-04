import React, { Component } from "react";
import styled from "styled-components/native";
import { View, Image, Text, StyleSheet } from "react-native";

import PostCardHeader from "./PostCardHeader";

const RootView = styled.View`
  min-height: 180;
  width: 100%;
  padding: 7px;
  background-color: ${props => props.theme.WHITE};
  shadow-color: ${props => props.theme.SECONDARY};
  shadow-offset: 0px 2px;
  shadow-radius: 2;
  shadow-opacity: 0.1;
  margin-vertical: 5;
`;

const CardContentContainer = styled.View`
  flex: 1;
  padding: 10px 0px 10px 0px;
`;

const CardContentText = styled.Text`
  font-size: 14;
  text-align: left;
  font-weight: 500;
  color: ${props => props.theme.SECONDARY};
`;

const PostCard = ({ description, imageUrl, createdAt }) => (
  <RootView>
    <PostCardHeader createdAt={createdAt} />
    <CardContentContainer>
      <CardContentText>{description}</CardContentText>
    </CardContentContainer>
  </RootView>
);

export default PostCard;
