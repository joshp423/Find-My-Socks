import { Pressable, Text, StyleSheet, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import updateData from "../db/updateData";
import * as SQLite from "expo-sqlite";
import createData from "../db/createData";

type CreateDataProps = {
  setEditedPropertyToggle: React.Dispatch<React.SetStateAction<boolean>>;
  type: "container" | "compartment";
};

type CreateDataAmountProps = {
  setEditedPropertyToggle: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
  id: number;
};

export function CreateNew({ setEditedPropertyToggle, type }: CreateDataProps) {
  const [dataTitle, setDataTitle] = useState<string>("");

  const db = SQLite.useSQLiteContext();

  async function handleEditSubmit() {
    await createData({ itemName: dataTitle, itemType: type, db });
    setEditedPropertyToggle(false);
  }

  return (
    <>
      <TextInput
        value={dataTitle}
        style={styles.input}
        onChangeText={setDataTitle}
        submitBehavior="blurAndSubmit"
        returnKeyType="default"
        inputMode="text"
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => setEditedPropertyToggle(false)}
          style={styles.cancelButton}
        >
          <AntDesign name="close" size={16} color="black" />
        </Pressable>
        <Pressable onPress={handleEditSubmit} style={styles.submitButton}>
          <AntDesign name="check" size={16} color="black" />
        </Pressable>
      </View>
    </>
  );
}

export function CreateDataAmount({
  setEditedPropertyToggle,
  amount,
  id,
}: CreateDataAmountProps) {
  //need numeric confirmation

  const [dataTitle, setDataTitle] = useState<string>("");
  const [dataAmount, setDataAmount] = useState<string>(String(amount));

  const db = SQLite.useSQLiteContext();

  async function handleEditSubmit() {
    await updateData({
      itemId: id,
      itemName: dataTitle,
      itemType: "item",
      db,
      amount: Number(dataAmount),
    });
    setEditedPropertyToggle(false);
  }
  return (
    <View>
      <TextInput
        value={dataTitle}
        style={styles.input}
        onChangeText={setDataTitle}
        onSubmitEditing={handleEditSubmit}
        submitBehavior="blurAndSubmit"
        returnKeyType="done"
      />
      <TextInput
        value={String(amount)}
        keyboardType="numeric"
        onChangeText={setDataAmount}
        onSubmitEditing={handleEditSubmit}
        submitBehavior="blurAndSubmit"
        returnKeyType="done"
      />
      <Pressable onPress={() => setEditedPropertyToggle(false)}>
        <AntDesign name="x" size={16} color="black" />
      </Pressable>
      <Pressable onPress={handleEditSubmit}>
        <AntDesign name="check" size={16} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "50%",
    height: "auto",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 16,
    backgroundColor: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
  },
  submitButton: {
    backgroundColor: "#ABDF75",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  cancelButton: {
    backgroundColor: "#ca3e3e",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
});
