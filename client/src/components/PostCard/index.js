import React, { Component } from "react";
import styled from "styled-components/native";
import { View, Image, Text, StyleSheet } from "react-native";

import PostCardHeader from "./PostCardHeader";

const RootView = styled.View`
  min-height: 350;
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

const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
`;

const PuppyImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 15px;
`;

const PostCard = ({ description, imageUrl, createdAt }) => (
  <RootView>
    <PostCardHeader createdAt={createdAt} />
    <CardContentContainer>
      <ImageContainer>
        <PuppyImage source={{ uri: imageUrl }} />
      </ImageContainer>
    </CardContentContainer>
  </RootView>
);

export default PostCard;
