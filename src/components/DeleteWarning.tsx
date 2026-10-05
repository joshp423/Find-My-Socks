import { Pressable, Text, StyleSheet, View } from "react-native";
import { GestureResponderEvent } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { type SQLiteDatabase } from "expo-sqlite";
import deleteData from "../db/deleteData";

type DeleteWarningProps = {
  setEditedPropertyId: React.Dispatch<React.SetStateAction<number | null>>;
  itemId: number;
  itemType: "container" | "compartment" | "item";
  db: SQLiteDatabase;
};
export function DeleteWarning({
  setEditedPropertyId,
  itemId,
  itemType,
  db
}: DeleteWarningProps) {

  
  async function handleEditSubmit() {
    await deleteData({itemId, itemType, db});
    setEditedPropertyId(null);
  }
  return (
    <View style={styles.deleteWarningView}>
      <Text style={{fontSize: 20}}>Delete Data?</Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setEditedPropertyId(null)} style={styles.cancelButton}>
          <AntDesign name="close" size={16} color="black" />
        </Pressable>
        <Pressable onPress={handleEditSubmit} style={styles.submitButton}>
          <AntDesign name="check" size={16} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  deleteWarningView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
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
