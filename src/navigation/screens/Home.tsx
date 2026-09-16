import { Button as NavButton, Text } from "@react-navigation/elements";
import { StyleSheet, View, TextInput, Button, FlatList } from "react-native";
import { CreateProfile } from "./CreateProfile";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import search from "../../db/search";
import { type ItemSearchResults } from "../../types/itemSearchResults";
import MyButton from "../../components/buttons";

export function Home() {
  const [userProfileCheck, setUserProfileCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [searchTerms, onChangeSearchTerms] = useState<string>("");
  const [confirmSearch, setConfirmSearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    "No Item Found" | ItemSearchResults[] | null
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

  type ItemProps = {
    itemName: string,  
    itemAmount: number,
    compartmentName: string,
    containerName: string
  };

  const Item = ({itemName, itemAmount, compartmentName, containerName}: ItemProps) => (
    //style these
    <View >
      <Text>{containerName}</Text>
      <Text>{compartmentName}</Text>
      <View>
        <Text>{itemName}</Text>
        <Text>Amount: {itemAmount}</Text>
      </View>
    </View>
  );

  if (!userProfileCheck) {
    return <CreateProfile userStorage={userStorage} />;
  }

  return (
    <View style={styles.container}>
      {!confirmSearch ? (
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchBarTitle} >What do you want to find {username}?</Text>
          <TextInput
            onChangeText={onChangeSearchTerms}
            editable
            maxLength={20}
            style={styles.input}
          />
          <View>
            <MyButton 
              onPress={ async () => {
                setConfirmSearch(true);
                const searchResults = await search(searchTerms, db);
                setSearchResults(searchResults);
                return;
              }}
              title="Go"
            />
          </View>
        </View>
      ) : (
        <View>
          {searchResults !== "No Item Found" ? (
            <View >
              <Text>Here's where to find {searchTerms}, {username}:</Text>
              <View>
                <FlatList
                  data={searchResults}
                  renderItem={({item}) => 
                    <Item
                      itemName={item.name}
                      itemAmount={item.amount}
                      compartmentName={item.parent.name}
                      containerName={item.parent.parent.name}
                    />
                  }
                />
              </View>
            </View>
          ) : (
           <View style={styles.searchBarContainer}>
            <Text>Item Not Found</Text>
            <Button 
              title="Back"
              onPress={() => {
                setSearchResults(null)
                setConfirmSearch(false)
              }}
            />
           </View>
          )}
        </View>
      )}
      <View style={styles.navButtons}>
        <NavButton screen="Storage">Manage Storage</NavButton>
        <NavButton screen="Profile" params={{ user: username }}>
          Edit Username
        </NavButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginBottom: 50
  },
  input: {
    width: "60%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
  },
  searchBarContainer: {
    flex: 2,
    width: "100%",
    padding: 10,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  navButtons: {
    flex: 1,
    gap: 15,
    justifyContent: "center",
  }
});
