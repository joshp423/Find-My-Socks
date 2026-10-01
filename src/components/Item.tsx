import { UserItem } from "../types/userItem";
import { View, Text, StyleSheet} from "react-native";
import { AddButton, DeleteButton, RenameButton } from "./Buttons";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EditDataAmount } from "./EditRename";

type ItemProps = {
  itemData: UserItem;
  compartmentContainerExpand: boolean
};

export default function Item({itemData, compartmentContainerExpand}: ItemProps) {
    const [editedItemId, setEditedItemId] = useState<number | null>(
        null,
      );

    return (
      <View
          style={compartmentContainerExpand ? styles.userItem : styles.disabled}
      >
        {editedItemId ? (
            <EditDataAmount
                setEditedPropertyId={setEditedItemId}
                name={itemData.name}
                id={editedItemId}
                amount={itemData.amount}
            />
        ) : (
            <>
                <Text>{itemData.name} x{itemData.amount}</Text>
                <View style={styles.buttonContainer}>
                    <AddButton
                        title="Add"
                        onPress={() => {return}}
                        children={<AntDesign name="plus" size={16} color="white" />}
                    />
                    <RenameButton
                        title="Edit"
                        onPress={() => {return}}
                        children={<AntDesign name="edit" size={16} color="black" />}
                    />
                    <DeleteButton
                        title="Delete"
                        onPress={() => {return}}
                        children={<AntDesign name="delete" size={16} color="black" />}
                    />
                </View>
            </>
        )}
      </View>
    )
}

const styles = StyleSheet.create({
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
})