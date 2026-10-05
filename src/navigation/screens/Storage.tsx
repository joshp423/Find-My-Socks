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
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  DeleteButton,
  ExpandButton,
  RenameButton,
  AddButton,
} from "../../components/Buttons";
import Compartment from "../../components/Compartment";
import { EditData } from "../../components/EditRename";
import { DeleteWarning } from "../../components/DeleteWarning";

export function Storage() {
  const [userStorage, setUserStorage] = useState<UserContainer[] | null>(null);
  const [viewedContainerExpand, setViewedContainerExpand] =
    useState<boolean>(false);
  const [editedContainerId, setEditedContainerId] = useState<number | null>(
    null,
  );
  const [deletedContainerId, setDeletedContainerId] = useState<number | null>(
    null,
  );

  const db = SQLite.useSQLiteContext();

  useEffect(() => {
    async function load() {
      if (editedContainerId || deletedContainerId) return;
      const userData = await getUserStorage(db);
      if (userData !== "No Data Found") {
        setUserStorage(userData);
        return;
      }
      setUserStorage(null);
      return;
    }
    load();
  }, [editedContainerId, deletedContainerId]);

  type ContainerProps = {
    containerData: UserContainer;
  };

  const Container = ({ containerData }: ContainerProps) => (
    <View style={styles.userContainer}>
      <View
        style={
          !viewedContainerExpand
            ? styles.userContainerControlRow
            : styles.userContainerControlRowExpanded
        }
      >
        {editedContainerId ? (
          <EditData
            setEditedPropertyId={setEditedContainerId}
            value={containerData.name}
            id={editedContainerId}
            type="container"
          />
        ) : deletedContainerId ? (
          <>
            <DeleteWarning
              setEditedPropertyId={setDeletedContainerId}
              itemId={containerData.id}
              itemType="container"
            />
          </>
        ) : (
          <>
            <Text style={styles.containerTitle}>{containerData.name}</Text>
            <View style={styles.buttonContainer}>
              <AddButton
                title="Add"
                onPress={() => {
                  setViewedContainerExpand((prev) => !prev);
                }}
                children={<AntDesign name="plus" size={16} color="white" />}
              />
              <RenameButton
                title="Delete"
                onPress={() => {
                  setEditedContainerId(containerData.id);
                }}
                children={<AntDesign name="edit" size={16} color="black" />}
              />
              <DeleteButton
                title="Delete"
                onPress={() => {
                  setDeletedContainerId(containerData.id);
                }}
                children={<AntDesign name="delete" size={16} color="black" />}
              />
              <ExpandButton
                title=""
                onPress={() => {
                  setViewedContainerExpand((prev) => !prev);
                }}
                children={
                  !viewedContainerExpand ? (
                    <AntDesign name="arrow-down" size={16} color="black" />
                  ) : (
                    <AntDesign name="arrow-up" size={16} color="black" />
                  )
                }
              />
            </View>
          </>
        )}
      </View>
      <FlatList
        data={containerData.compartments}
        renderItem={({ item: compartment }) => (
          <Compartment
            compartmentData={compartment}
            viewedContainerExpand={viewedContainerExpand}
          />
        )}
      />
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Manage Storage</Text>
        {userStorage ? (
          <FlatList
            style={styles.flatListUserData}
            data={userStorage}
            renderItem={({ item: container }) => (
              <Container containerData={container} />
            )}
          />
        ) : (
          <Text>No Data</Text>
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
  userContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingBottom: 10,
    paddingTop: 10,
  },
  userContainerControlRow: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 50,
  },
  userContainerControlRowExpanded: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    minHeight: 50,
  },
  containerTitle: {
    fontSize: 20,
  },
  disabled: {
    display: "none",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
