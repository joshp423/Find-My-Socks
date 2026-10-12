import { UserItem } from "../types/userItem";
import { View, Text, StyleSheet } from "react-native";
import { AddButton, DeleteButton, RenameButton } from "./Buttons";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EditDataAmount } from "./EditRename";
import { DeleteWarning } from "./DeleteWarning";
import type { UserContainer } from "../types/userContainer";
import { CreateNewAmount } from "./CreateNew";
import { ExpandView } from "./Animations";

type ItemProps = {
  itemData: UserItem;
  compartmentContainerExpand: boolean;
  setUserStorage: React.Dispatch<React.SetStateAction<UserContainer[] | null>>;
};

export default function Item({
  itemData,
  compartmentContainerExpand,
  setUserStorage,
}: ItemProps) {
  const [editedItemId, setEditedItemId] = useState<number | null>(null);
  const [deletedItemId, setDeletedItemId] = useState<number | null>(null);
  const [newItemToggle, setNewItemToggle] = useState<boolean>(false);

  return (
    <ExpandView
      displayed={compartmentContainerExpand}
      style={compartmentContainerExpand ? styles.userItem : styles.disabled}
    >
      {editedItemId ? (
        <EditDataAmount
          setEditedPropertyId={setEditedItemId}
          name={itemData.name}
          id={editedItemId}
          amount={itemData.amount}
          setUserStorage={setUserStorage}
        />
      ) : deletedItemId ? (
        <>
          <DeleteWarning
            setEditedPropertyId={setDeletedItemId}
            itemId={itemData.id}
            itemType="item"
            setUserStorage={setUserStorage}
          />
        </>
      ) : newItemToggle ? (
        <>
          <CreateNewAmount
            setEditedPropertyToggle={setNewItemToggle}
            setUserStorage={setUserStorage}
            parentId={itemData.parentID}
          />
        </>
      ) : (
        <>
          <Text style={{fontSize: 14}}>
            {itemData.name} x{itemData.amount}
          </Text>
          <View
            style={
              compartmentContainerExpand
                ? styles.buttonContainer
                : styles.disabled
            }
          >
            <AddButton
              title="Add"
              onPress={() => setNewItemToggle(true)}
              children={<AntDesign name="plus" size={16} color="white" />}
            />
            <RenameButton
              title="Edit"
              onPress={() => {
                setEditedItemId(itemData.id);
              }}
              children={<AntDesign name="edit" size={16} color="black" />}
            />
            <DeleteButton
              title="Delete"
              onPress={() => {
                setDeletedItemId(itemData.id);
              }}
              children={<AntDesign name="delete" size={16} color="black" />}
            />
          </View>
        </>
      )}
    </ExpandView>
  );
}

const styles = StyleSheet.create({
  disabled: {
    display: "none",
  },
  userItem: {
    width: "100%",
    padding: 5,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
});
