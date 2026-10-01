import { GestureResponderEvent } from "react-native";
import { Pressable, Text, StyleSheet, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import updateData from "../db/updateData";
import * as SQLite from "expo-sqlite";

type EditDataProps = {
  setEditedPropertyId: React.Dispatch<React.SetStateAction<number | null>>;
  value: string;
  id: number;
  type: "container" | "compartment";
};

type EditDataAmountProps = {
  setEditedPropertyId: React.Dispatch<React.SetStateAction<number | null>>;
  name: string;
  amount: number;
  id: number;
};

export function EditData({
  setEditedPropertyId,
  value,
  id,
  type,
}: EditDataProps) {
  const [dataTitle, setDataTitle] = useState<string>(value);

  const db = SQLite.useSQLiteContext();

  async function handleEditSubmit() {
    await updateData({ itemId: id, itemName: dataTitle, itemType: type, db });
    setEditedPropertyId(null);
  }

  return (
    <>
      <TextInput
        value={dataTitle}
        style={styles.input}
        onChangeText={setDataTitle}
        onSubmitEditing={handleEditSubmit}
        submitBehavior="blurAndSubmit"
        returnKeyType="done"
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => setEditedPropertyId(null)}
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

export function EditDataAmount({
  setEditedPropertyId,
  name,
  amount,
  id,
}: EditDataAmountProps) {
  //need numeric confirmation

  const [dataTitle, setDataTitle] = useState<string>(name);
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
    setEditedPropertyId(null);
  }
  return (
    <View>
      <TextInput
        value={name}
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
      <Pressable onPress={() => setEditedPropertyId(null)}>
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
