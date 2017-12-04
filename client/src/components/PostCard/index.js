import React, { Component } from "react";
import styled from "styled-components/native";
import { View, Image, Text, StyleSheet } from "react-native";

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
  padding: 10px 20px 10px 0px;
`;

const CardContentText = styled.Text`
  font-size: 14;
  text-align: left;
  font-weight: 500;
  color: ${props => props.theme.SECONDARY};
`;

const IMAGE_HEIGHT = 300;
const IMAGE_WIDTH = "100%";

const PuppyImage = styled.Image`
  height: ${IMAGE_HEIGHT};
  width: ${IMAGE_WIDTH};
  border-radius: 30px;
`;

const PostCard = ({ description, imageUrl }) => (
  <RootView>
    <CardContentContainer>
      <PuppyImage source={{ uri: imageUrl }} />
      <CardContentText>{description}</CardContentText>
    </CardContentContainer>
  </RootView>
);

export default PostCard;
