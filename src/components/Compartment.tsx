import { userCompartment } from "../types/userCompartment";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { AddButton, ExpandButton, DeleteButton, RenameButton } from "./Buttons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { EditData } from "./EditRename";
import Item from "./Item";
import { DeleteWarning } from "./DeleteWarning";
import type { UserContainer } from "../types/userContainer";
import { CreateNew } from "./CreateNew";
import NoDataRow from "./NoDataRow";

type CompartmentProps = {
  compartmentData: userCompartment;
  viewedContainerExpand: boolean;
  setUserStorage: React.Dispatch<React.SetStateAction<UserContainer[] | null>>;
};

export default function Compartment({
  compartmentData,
  viewedContainerExpand,
  setUserStorage,
}: CompartmentProps) {
  const [compartmentContainerExpand, setCompartmentContainerExpand] =
    useState<boolean>(false);
  const [editedCompartmentId, setEditedCompartmentId] = useState<number | null>(
    null,
  );
  const [deletedCompartmentId, setDeletedCompartmentId] = useState<
    number | null
  >(null);
  const [newCompartmentToggle, setNewCompartmentToggle] = useState<boolean>(false);

  return (
    <View
      style={viewedContainerExpand ? styles.userCompartment : styles.disabled}
    >
      <View
        style={
          !compartmentContainerExpand
            ? styles.userCompartmentControlRow
            : styles.userCompartmentControlRowExpanded
        }
      >
        {editedCompartmentId ? (
          <EditData
            setEditedPropertyId={setEditedCompartmentId}
            value={compartmentData.name}
            id={editedCompartmentId}
            type="compartment"
            setUserStorage={setUserStorage}
          />
        ) : deletedCompartmentId ? (
          <>
            <DeleteWarning
              setEditedPropertyId={setDeletedCompartmentId}
              itemId={compartmentData.id}
              itemType="compartment"
              setUserStorage={setUserStorage}
            />
          </>
        ) : newCompartmentToggle ? (
          <>
            <CreateNew 
              type="compartment"
              setUserStorage={setUserStorage}
              setEditedPropertyToggle={setNewCompartmentToggle}
              parentId={compartmentData.parentID}
            />
          </>
        ) : compartmentContainerExpand && compartmentData.items.length === 0 ? (
          <>
            <NoDataRow 
              type="compartment"
              setNewCompartmentToggle={setNewCompartmentToggle}
            />
          </>
        ) : (
          <>
            <Text style={styles.compartmentTitle}>{compartmentData.name}</Text>
            <View style={styles.buttonContainer}>
              <AddButton
                title="Add"
                onPress={() => {
                  setNewCompartmentToggle(true);
                }}
                children={<AntDesign name="plus" size={16} color="white" />}
              />
              <RenameButton
                title="Delete"
                onPress={() => {
                  setEditedCompartmentId(compartmentData.id);
                }}
                children={<AntDesign name="edit" size={16} color="black" />}
              />
              <DeleteButton
                title="Delete"
                onPress={() => {
                  setDeletedCompartmentId(compartmentData.id)
                }}
                children={<AntDesign name="delete" size={16} color="black" />}
              />
              <ExpandButton
                title=""
                onPress={() => {
                  setCompartmentContainerExpand((prev) => !prev);
                }}
                children={
                  !compartmentContainerExpand ? (
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
        data={compartmentData.items}
        renderItem={({ item }) => (
          compartmentContainerExpand && compartmentData.items.length === 0 ? (
            <NoDataRow 
              type="item"
              setNewCompartmentToggle={setNewCompartmentToggle}
            />
          ) : (
          <Item
            itemData={item}
            compartmentContainerExpand={compartmentContainerExpand}
            setUserStorage={setUserStorage}
          />
          )
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  userCompartment: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
  },
  userCompartmentControlRow: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userCompartmentControlRowExpanded: {
    width: "100%",
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 0.5,
  },
  compartmentTitle: {
    fontSize: 15,
  },
  disabled: {
    display: "none",
  },
  userItem: {
    display: "flex",
    padding: 5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
