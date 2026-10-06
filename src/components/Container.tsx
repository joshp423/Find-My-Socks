import { Text } from "@react-navigation/elements";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { UserContainer } from "../types/userContainer";
import AntDesign from "@expo/vector-icons/AntDesign";
import { DeleteButton, ExpandButton, RenameButton, AddButton } from "./Buttons";
import Compartment from "./Compartment";
import { EditData } from "./EditRename";
import { DeleteWarning } from "./DeleteWarning";
import { CreateNew } from "./CreateNew";
import NoDataRow from "./NoDataRow";

type ContainerProps = {
  containerData: UserContainer;
  setUserStorage: React.Dispatch<React.SetStateAction<UserContainer[] | null>>;
};

export default function Container({
  containerData,
  setUserStorage,
}: ContainerProps) {
  const [viewedContainerExpand, setViewedContainerExpand] =
    useState<boolean>(false);
  const [editedContainerId, setEditedContainerId] = useState<number | null>(
    null,
  );
  const [deletedContainerId, setDeletedContainerId] = useState<number | null>(
    null,
  );
  const [newContainerToggle, setNewContainerToggle] = useState<boolean>(false);

  return (
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
            setUserStorage={setUserStorage}
          />
        ) : deletedContainerId ? (
          <>
            <DeleteWarning
              setEditedPropertyId={setDeletedContainerId}
              itemId={containerData.id}
              itemType="container"
              setUserStorage={setUserStorage}
            />
          </>
        ) : newContainerToggle ? (
          <>
            <CreateNew
              setEditedPropertyToggle={setNewContainerToggle}
              type="container"
              setUserStorage={setUserStorage}
            />
          </>
        ) : (
          <>
            <Text style={styles.containerTitle}>{containerData.name}</Text>
            <View style={styles.buttonContainer}>
              <AddButton
                title="Add"
                onPress={() => {
                  setNewContainerToggle(true);
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
      {viewedContainerExpand && containerData.compartments.length === 0 ? (
            <NoDataRow 
                type="compartment"
                setNewCompartmentToggle={setNewContainerToggle}
            />
        ) : (
            <FlatList
                data={containerData.compartments}
                renderItem={({ item: compartment }) => (
                <Compartment
                    compartmentData={compartment}
                    viewedContainerExpand={viewedContainerExpand}
                    setUserStorage={setUserStorage}
                />
                )}
            />
        )
    }
    </View>
  );
}

const styles = StyleSheet.create({
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
