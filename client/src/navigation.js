import React, { Component } from "react";
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import { Keyboard } from "react-native";
import { FontAwesome, SimpleLineIcons, EvilIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import ButtonHeader from "./components/ButtonHeader";
import { COLORS } from "./constants";

const ICON_SIZE = 20;

const TabNavigation = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: "Blogger",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome size={ICON_SIZE} color={tintColor} name="home" />
        )
      })
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: COLORS.PRIMARY,
      inactiveTintColor: COLORS.LIGHT_GREY,
      style: {
        backgroundColor: COLORS.WHITE,
        height: 50,
        paddingVertical: 5
      }
    }
  }
);

const CreatePostModal = StackNavigator(
  {
    CreatePost: {
      screen: CreatePostScreen,
      navigationOptions: ({ navigation }) => ({
        headerLeft: null,
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => {
              Keyboard.dismiss();
              navigation.goBack(null);
            }}
          >
            <EvilIcons color={COLORS.PRIMARY} size={25} name="close" />
          </ButtonHeader>
        )
      })
    }
  },
  {
    headerMode: "none"
  }
);

const MainNavigation = StackNavigator(
  {
    Home: {
      screen: TabNavigation,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <ButtonHeader
            side="right"
            onPress={() => navigation.navigate("CreatePost")}
          >
            <SimpleLineIcons
              color={COLORS.PRIMARY}
              size={ICON_SIZE}
              name="pencil"
            />
          </ButtonHeader>
        )
      })
    },
    CreatePost: {
      screen: CreatePostModal
    }
  },
  {
    cardStyle: {
      backgroundColor: "#F1F6FA"
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: COLORS.WHITE
      },
      headerTitleStyle: {
        fontWeight: "bold",
        color: COLORS.SECONDARY
      }
    })
  }
);

class AppNavigator extends Component {
  render() {
    return <MainNavigation />;
  }
}

export default AppNavigator;
