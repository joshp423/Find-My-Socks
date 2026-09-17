import {
  createBottomTabNavigator,
  createBottomTabScreen,
} from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
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
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { Storage } from "./screens/Storage";



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
    tabBarInactiveTintColor: "white"
  },
  screens: {
    Home: createBottomTabScreen({
      screen: Home,
      options: {
        title: "Home",
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
        headerShown: false
      },
    }),
    Updates: createBottomTabScreen({
      screen: Storage,
      options: {
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
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
    Profile: createNativeStackScreen({
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    }),
    Storage: createNativeStackScreen({
      screen: Storage,
      options: ({ navigation }) => ({
        title: "Manage Storage",
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
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
