import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import getUserStorage from "../../db/getUserStorage";
import * as SQLite from "expo-sqlite";
import { UserContainer } from "../../types/userContainer";
import Container from "../../components/Container";
import { CreateNew } from "../../components/CreateNew";

export function Storage() {
  const [userStorage, setUserStorage] = useState<UserContainer[] | null>(null);

  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    async function load() {
      const userData = await getUserStorage(db);
      if (userData !== "No Data Found") {
        setUserStorage(userData);
        return;
      }
      setUserStorage(null);
      return;
    }
    load();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Storage</Text>
        {userStorage ? (
          <FlatList
            style={styles.flatListUserData}
            data={userStorage}
            renderItem={({ item: container }) => (
              <Container
                containerData={container}
                setUserStorage={setUserStorage}
              />
            )}
          />
        ) : (
          <>
            <Text>No Data</Text>
            <CreateNew type="container" setUserStorage={setUserStorage} />
          </>
          //add needed
        )}
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
    backgroundColor: "#C5D6D8",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  title: {
    marginTop: 60,
    fontSize: 30,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  flatListUserData: {
    width: "100%",
  },
});
