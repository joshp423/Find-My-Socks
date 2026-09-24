import { Text } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import getUserStorage from "../../db/getUserStorage";
import * as SQLite from "expo-sqlite";
import { UserContainer } from "../../types/userContainer";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ExpandButton } from "../../components/buttons";
import Compartment from "../../components/Compartment";

export function Storage() {
  const [userStorage, setUserStorage] = useState<UserContainer[] | null>(null);
  const [viewedContainerExpand, setViewedContainerExpand] = useState<boolean>(false);
  const db = SQLite.useSQLiteContext();
  
  useEffect(() => {
    async function load(){
      const userData = await getUserStorage(db);
      if (userData !== "No Data Found") {
        setUserStorage(userData);
        return;
      }
      setUserStorage(null);
      return;
    }
    load();
  }, [])

  type ContainerProps = {
    containerData: UserContainer
  };


  

  const Container = ({containerData}: ContainerProps) => (
    //style these
    <View style={styles.userContainer}>
      <View style={styles.userContainerControlRow}>
        <Text style={styles.containerTitle}>{containerData.name}</Text>
        <ExpandButton
          title=""
          onPress={() => {setViewedContainerExpand(prev => !prev)}}
          children={!viewedContainerExpand ? <AntDesign name="arrow-down" size={16} color="black" /> : <AntDesign name="arrow-up" size={16} color="black" />}
        />
      </View>
      
      <FlatList 
        data={containerData.compartments}
        renderItem={({item: compartment}) => <Compartment compartmentData={compartment} viewedContainerExpand={viewedContainerExpand} /> }
      />
    </View>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Storage</Text>
      {userStorage ? (
        <FlatList
          style={styles.flatListUserData}
          data={userStorage}
          renderItem={({item: container}) =>
            <Container 
              containerData={container}
            />
          }
        />
      ) : (
        <Text>No Data</Text>
      )}
    </View>
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
  title: {
    marginTop: 60,
    fontSize: 30,
    alignSelf: "flex-start",
    paddingLeft: 20,
    fontWeight: "bold"
  },
  flatListUserData: {
    width: "100%"
  },
  userContainer: {
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  userContainerControlRow: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  containerTitle:{
    fontSize: 20
  },
  userCompartmentControlRow: {
    display: "flex",
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  compartmentTitle: {
    
  },
  disabled: {
    display: "none",
  }
});
