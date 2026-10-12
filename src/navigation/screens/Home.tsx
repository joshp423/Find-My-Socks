import { Text } from "@react-navigation/elements";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState } from "react";
import search from "../../db/search";
import { type ItemSearchResults } from "../../types/itemSearchResults";
import { DefaultButton } from "../../components/Buttons";
import AntDesign from "@expo/vector-icons/AntDesign";

export function Home() {
  const [searchTerms, onChangeSearchTerms] = useState<string>("");
  const [confirmSearch, setConfirmSearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    "No Item Found" | ItemSearchResults[] | null
  >(null);

  const db = SQLite.useSQLiteContext();

  type ItemProps = {
    itemName: string;
    itemAmount: number;
    compartmentName: string;
    containerName: string;
  };

  const Item = ({
    itemName,
    itemAmount,
    compartmentName,
    containerName,
  }: ItemProps) => (
    //style these
    <View style={styles.resultsListItem}>
      <View style={styles.resultsItemContainer}>
        <Text style={styles.resultsItemText}>{itemName}</Text>
        <Text style={styles.resultsItemAmountText}>Amount: {itemAmount}</Text>
      </View>
      <View style={styles.resultsPath}>
        <View style={{flexDirection: "row", gap: 5}}> 
          <AntDesign
            name="group"
            size={14}
            color="black"
            style={styles.resultsArrow}
          />
          <Text style={styles.resultsContainerText}>{containerName}</Text>
        </View>
          <AntDesign
            name="arrow-right"
            size={14}
            color="black"
            style={styles.resultsArrow}
          />
        <View style={{flexDirection: "row", gap: 5}}>
          <AntDesign
            name="folder"
            size={16}
            color="black"
            style={styles.resultsArrow}
          />
          <Text style={styles.resultsCompartmentText}>{compartmentName}</Text>
        </View>
      </View>
     
      
    </View>
  );

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
            <DefaultButton
              onPress={async () => {
                setConfirmSearch(true);
                const searchResults = await search(searchTerms, db);
                setSearchResults(searchResults);
                return;
              }}
              title="Search"
            />
          </View>
        </View>
        {confirmSearch ? (
          <View style={styles.searchResultsContainer}>
            {searchResults !== "No Item Found" ? (
              <View style={styles.foundSearchResults}>
                <Text style={styles.searchTermTitle}>
                  Here's where to find "{searchTerms}":
                </Text>
                <View>
                  <FlatList
                    style={styles.searchResultsScrollContainer}
                    data={searchResults}
                    renderItem={({ item }) => (
                      <Item
                        itemName={item.name}
                        itemAmount={item.amount}
                        compartmentName={item.parent.name}
                        containerName={item.parent.parent.name}
                      />
                    )}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.searchBarContainer}>
                <Text>Item Not Found</Text>
              </View>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
    width: "100%",
    height: "100%",
    backgroundColor: "#C5D6D8",
  },
  input: {
    width: "100%",
    height: 40,
    margin: 10,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "white",
  },
  title: {
    marginTop: 60,
    fontSize: 30,
    alignSelf: "flex-start",
    paddingLeft: 20,
    fontWeight: "bold",
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
    backgroundColor: "#ABDF75",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#60695C",
    borderStyle: "solid",
    borderWidth: 1,
  },
  searchResultsContainer: {
    marginTop: 20,
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
  },
  foundSearchResults: {
    gap: 10,
    justifyContent: "center",
    alignContent: "flex-start",
  },
  searchTermTitle: {
    fontSize: 20,
    fontWeight: "bold",
    borderBottomWidth: 0.5,
  },
  searchResultsScrollContainer: {
    maxHeight: "100%",
    gap: 10,
  },
  resultsListItem: {
    gap: 10,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "white",
    alignItems: "flex-start",
    marginBottom: 10,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  resultsContainerText: {
    fontSize: 14,
    color: "black",
  },
  resultsCompartmentText: {
    fontSize: 14,
    color: "black",
  },
  resultsItemContainer: {
    alignItems: "flex-start",
    gap: 5,
    padding: 5,
  },
  resultsItemText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  resultsItemAmountText: {
    fontSize: 13,
    color: "black",
  },
  resultsArrow: {
    alignSelf: "center",
  },
  resultsPath: {
    flexDirection: "row", 
    width: "100%",
    gap: 10,
    backgroundColor: "#ABDF75",
    padding: 7,
    paddingLeft: 10,
    borderRadius: 12
  }
});
