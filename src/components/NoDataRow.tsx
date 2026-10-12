import { Text, StyleSheet } from "react-native";
import { AddButton } from "./Buttons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { CreateNew, CreateNewAmount } from "./CreateNew";
import type { UserContainer } from "../types/userContainer";
import { ExpandView } from "./Animations";

type NoDataRowProps = {
  type: "compartment" | "item";
  setUserStorage: React.Dispatch<React.SetStateAction<UserContainer[] | null>>;
  parentId: number;
  displayed: boolean;
};

export default function NoDataRow({
  type,
  setUserStorage,
  parentId,
  displayed
}: NoDataRowProps) {
  const [newItemToggle, setNewItemToggle] = useState<boolean>(false);
  return (
    <ExpandView displayed={displayed} style={styles.noDataRow}>
      {newItemToggle ? (
        type === "compartment" ? (
          <CreateNew
            type="compartment"
            setUserStorage={setUserStorage}
            parentId={parentId}
            setEditedPropertyToggle={setNewItemToggle}
          />
        ) : (
          <CreateNewAmount
            setEditedPropertyToggle={setNewItemToggle}
            setUserStorage={setUserStorage}
            parentId={parentId}
          />
        )
      ) : (
        <>
          <Text style={{fontSize: 14}}>No {type}s</Text>
          <AddButton
            onPress={() => setNewItemToggle(true)}
            title="Add"
            children={<AntDesign name="plus" size={16} color="white" />}
          />
        </>
      )}
    </ExpandView>
  );
}

const styles = StyleSheet.create({
  noDataRow: {
    width: "100%",
    padding: 5,
    paddingBottom: 10,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5
  }
})
