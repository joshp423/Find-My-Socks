import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from "@react-navigation/bottom-tabs";
import { createStaticNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createNativeStackScreen,
} from "@react-navigation/native-stack";
import { Image } from "react-native";
import bell from "../assets/bell.png";
import newspaper from "../assets/newspaper.png";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import { Storage } from "./screens/Storage";
import AntDesign from "@expo/vector-icons/AntDesign";

const HomeTabs = createBottomTabNavigator({
  screenOptions: {
    tabBarStyle: {
      position: "absolute",
      width: "80%",
      justifyContent: "center",
      borderRadius: 24,
      marginLeft: "10%",
      marginRight: "10%",
      marginBottom: "5%",
      paddingBottom: 0,
      height: 50,
      alignContent: "center",
    },
    tabBarActiveBackgroundColor: "#ABDF75",
    tabBarInactiveBackgroundColor: "#60695C",
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "white",
  },
  screens: {
    Home: createBottomTabScreen({
      screen: Home,
      options: {
        title: "Find Items",
        tabBarIcon: ({ color, size }) => (
          <AntDesign 
            name="compass"
            size={size}
            color={color}
          />
        ),
        headerShown: false,
      },
    }),
    ManageStorage: createBottomTabScreen({
      screen: Storage,
      options: {
        title: "Manage Storage",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <AntDesign 
            name="container"
            size={size}
            color={color}
          />
        ),
      },
    }),
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: createNativeStackScreen({
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    }),
    Storage: createNativeStackScreen({
      screen: Storage,
      options: {
        title: "Manage Storage",
        headerShown: false,
      },
    }),
    NotFound: createNativeStackScreen({
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    }),
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackType = typeof RootStack;

declare module "@react-navigation/native" {
  interface RootNavigator extends RootStackType {}
}
