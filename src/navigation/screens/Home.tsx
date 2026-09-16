import { Button as NavButton, Text } from "@react-navigation/elements";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { CreateProfile } from "./CreateProfile";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import search from "../../db/search";
import { type ItemSearchResults } from "../../types/itemSearchResults";

export function Home() {
  const [userProfileCheck, setUserProfileCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [searchTerms, onChangeSearchTerms] = useState<string>("");
  const [confirmSearch, setConfirmSearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    "No Item Found" | ItemSearchResults | null
  >(null);

  const db = SQLite.useSQLiteContext();

  // create a storage instance
  const userStorage = createAsyncStorage("appDB");

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
  }, []);

  if (!userProfileCheck) {
    return <CreateProfile userStorage={userStorage} />;
  }

  return (
    <View style={styles.container}>
      {!confirmSearch ? (
        <View>
          <Text>What do you want to find {username}?</Text>
          <TextInput
            onChangeText={onChangeSearchTerms}
            editable
            maxLength={20}
            style={styles.input}
          />
          <Button
            title="Go"
            onPress={() => {
              setConfirmSearch(true);
              search(searchTerms, db);
            }}
          />
        </View>
      ) : (
        <View>
          <Text>Searchy searchy {username}?</Text>
          <TextInput
            onChangeText={onChangeSearchTerms}
            editable
            maxLength={20}
            style={styles.input}
          />
          <Button
            title="Go"
            onPress={() => {
              setConfirmSearch(true);
            }}
          />
        </View>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    width: "60%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
