import { Text, View } from "react-native";
import { AddButton } from "./Buttons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { CreateNew, CreateNewAmount } from "./CreateNew";
import type { UserContainer } from "../types/userContainer";

type NoDataRowProps = {
  type: "compartment" | "item";
  setNewCompartmentToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setUserStorage: React.Dispatch<React.SetStateAction<UserContainer[] | null>>;
  parentId: number;
};

export default function NoDataRow({
  type,
  setNewCompartmentToggle,
  setUserStorage,
  parentId,
}: NoDataRowProps) {
  const [newItemToggle, setNewItemToggle] = useState<boolean>(false);
  return (
    <>
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
          <Text>No {type}s</Text>
          <AddButton
            onPress={() => setNewItemToggle(true)}
            title="Add"
            children={<AntDesign name="plus" size={16} color="white" />}
          />
        </>
      )}
    </>
  );
}
