import { Button as NavButton, Text } from '@react-navigation/elements';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { CreateProfile } from './CreateProfile';
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

export function Home() {
  const [userProfileCheck, setUserProfileCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [searchTerms, onChangeSearchTerms] = useState<string>("");
  const [confirmSearch, setConfirmSearch] = useState<boolean>(false);

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
      <Text>What do you want to find {username}?</Text>
      <TextInput 
        onChangeText={onChangeSearchTerms}
        editable
        maxLength={20}
        style={styles.input}
      />
      <Button 
        title='Go'
        onPress={() => {
          setConfirmSearch(true);
        }}
        />
      <NavButton screen="Storage">Manage Storage</NavButton>
      <NavButton screen="Profile" params={{ user: username }}>
        Edit Username
      </NavButton>
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
  input: {
    width: '60%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
