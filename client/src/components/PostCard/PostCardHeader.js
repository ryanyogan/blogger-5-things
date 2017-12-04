import React from "react";
import styled from "styled-components/native";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { mockAvatar } from "../../constants";

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const RootView = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View`
  flex: 0.2;
  justify-content: center;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  border-radius: ${AVATAR_RADIUS};
`;

const DataContainer = styled.View`
  flex: 1;
`;

const DataTopContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const DataBottomContainer = styled.View`
  flex: 0.8;
  align-items: flex-start;
  justify-content: center;
`;

const DataText = styled.Text`
  font-size: 14;
  font-weight: 600;
  color: ${props => props.theme.LIGHT_GREY};
`;

const DataFullName = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const PostCardHeader = ({
  name = "Bella Yogan",
  username = "BellOfTheBall",
  createdAt
}) => (
  <RootView>
    <AvatarContainer>
      <Avatar source={{ uri: mockAvatar }} />
    </AvatarContainer>
    <DataContainer>
      <DataTopContainer>
        <DataFullName>{name}</DataFullName>
        <DataText style={{ marginLeft: 5 }}>@{username}</DataText>
      </DataTopContainer>
      <DataBottomContainer>
        <DataText>{distanceInWordsToNow(createdAt)} ago</DataText>
      </DataBottomContainer>
    </DataContainer>
  </RootView>
);

export default PostCardHeader;
