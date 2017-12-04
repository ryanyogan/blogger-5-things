import React from "react";
import styled from "styled-components/native";
import Touchable from "@appandflow/touchable";

const Button = styled(Touchable).attrs({
  feedback: "opacity",
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 }
})`
  justify-content: center;
  align-items: center;
  margin-left: ${props => (props.side === "left" ? 15 : 0)};
  margin-right: ${props => (props.side === "right" ? 15 : 0)};
`;

export default ({ side, children, onPress, disabled }) => (
  <Button onPress={onPress} disabled={disabled} side={side}>
    {children}
  </Button>
);
