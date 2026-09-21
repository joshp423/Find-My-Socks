import { Button as NavButton, Text } from "@react-navigation/elements";
import { StyleSheet, View, TextInput, Button, FlatList, TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { CreateProfile } from "./CreateProfile";
import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import search from "../../db/search";
import { type ItemSearchResults } from "../../types/itemSearchResults";
import MyButton from "../../components/buttons";
import AntDesign from '@expo/vector-icons/AntDesign';

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
    <View style={styles.resultsList}>
      <Text style={styles.resultsContainerText}>{containerName}</Text>
      <AntDesign name="arrow-down" size={16} color="black" />
      <Text style={styles.resultsCompartmentText}>{compartmentName}</Text>
      <AntDesign name="arrow-down" size={16} color="black" style={styles.resultsArrow}/>
      <View style={styles.resultsItemContainer}>
        <Text style={styles.resultsItemText}>{itemName}</Text>
        <Text style={styles.resultsItemAmountText}>Amount: {itemAmount}</Text>
      </View>
    </View>
  );

  if (!userProfileCheck) {
    return <CreateProfile userStorage={userStorage} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Find My Socks</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              onChangeText={onChangeSearchTerms}
              editable
              maxLength={20}
              style={styles.input}
              placeholder="Search for item"
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
          {confirmSearch ? (
            <View style={styles.searchResultsContainer}>
              {searchResults !== "No Item Found" ? (
                <View style={styles.foundSearchResults}>
                  <Text style={styles.searchTermTitle}>Here's where to find {searchTerms}:</Text>
                  <View style={styles.searchResultsScrollContainer}>
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
                </View>
              )}
            </View>
          ) : <></> }
        <View style={styles.navButtons}>
          <NavButton 
            screen="Profile" params={{ user: username }}
            style={styles.navButton}
            color="black"
          >
            Edit Username
          </NavButton>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    width: "100%",
    backgroundColor: '#C5D6D8',
  },
  input: {
    width: "100%",
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "white"
  },
  title: {
    marginTop: 60,
    fontSize: 30,
    alignSelf: "flex-start",
    paddingLeft: 20,
    fontWeight: "bold"
  },
  searchBarContainer: {
    width: "100%",
    height: "auto",
    padding: 10,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtons: {
    flex: 1,
    gap: 15,
    justifyContent: "center",
  },
  navButton: {
    backgroundColor: '#ABDF75',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#60695C',
    borderStyle: "solid",
    borderWidth: 1,
  },
  searchResultsContainer: {
    marginTop: 30,
    width: "100%",
    justifyContent:"center",
    alignContent:"flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
  foundSearchResults: {
    gap: 10,
    justifyContent:"center",
    alignContent:"flex-start",
  },
  searchTermTitle: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 0.5
  },
  searchResultsScrollContainer: {
    
  },
  resultsList: {
    gap: 10, 
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#ABDF75",
    borderWidth: 0.5,
    alignItems: "center",
  },
  resultsContainerText: {
    fontSize: 18,
    color: "black",
  },
  resultsCompartmentText: {
    fontSize: 16,
    paddingLeft: 5,
    color: "black",
  },
  resultsItemContainer: {
    flexDirection:"row",
    gap: 10,
    paddingLeft: 5,
  },
  resultsItemText: {
    fontSize: 14,
    color: "black",
  },
  resultsItemAmountText: {
    fontSize: 14,
    color: "black",
  },
  resultsArrow: {
    alignSelf: "center"
  }

});
