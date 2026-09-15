import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { CreateProfile } from './CreateProfile';
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

export function Home() {
  const [userProfileCheck, setUserProfileCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  // create a storage instance
  const userStorage = createAsyncStorage("appDB");

  useEffect(() => {

    async function load(){
      //create db and table if not already
      const db = await SQLite.openDatabaseAsync('databaseName');

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
    };
    load();

  },[])

//   await userStorage.removeItem("userToken");

  useEffect(() => {
    async function load() {
      const user = await userStorage.getItem("userProfile");
      if (user) {
        setUserProfileCheck(true);
        setUsername(user);
        return;
      }
      setUserProfileCheck(false);
      return;
    }
    load();
  },[])

  if (!userProfileCheck) {
    return (
      <CreateProfile userStorage={userStorage}/>
    )
  }
  return (
    <View style={styles.container}>
      <Text>Find My Socks</Text>
      <Button screen="Profile" params={{ user: username }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
      <Button screen="Storage">Manage Storage</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
