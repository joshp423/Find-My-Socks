import { Assets as NavigationAssets } from "@react-navigation/elements";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { createURL } from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import { Navigation } from "./navigation";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

Asset.loadAsync([
  ...NavigationAssets,
  require("./assets/newspaper.png"),
  require("./assets/bell.png"),
]);

SplashScreen.preventAutoHideAsync();

const linking = {
  enabled: "auto" as const,
  prefixes: [createURL("/")],
};

//https://coolors.co/d6f9dd-abdf75-60695c-c5d6d8

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  async function createDBTablesIfNeeded(db: SQLiteDatabase) {
    //create db and table if not already
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS userContainers (
        id INTEGER PRIMARY KEY NOT NULL,
        name STRING NOT NULL
      );
      CREATE TABLE IF NOT EXISTS userCompartments (
        id INTEGER PRIMARY KEY NOT NULL,
        parentID INTEGER NOT NULL,
        name STRING NOT NULL
      );
      CREATE TABLE IF NOT EXISTS userItems (
        id INTEGER PRIMARY KEY NOT NULL,
        parentID INTEGER NOT NULL,
        name STRING NOT NULL,
        amount INTEGER NOT NULL CHECK(amount >= 0 AND amount <= 100)
      );
    `);
  }

  return (
    <SQLiteProvider databaseName="userData" onInit={createDBTablesIfNeeded}>
      <Navigation
        theme={theme}
        linking={linking}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      />
    </SQLiteProvider>
  );
}
