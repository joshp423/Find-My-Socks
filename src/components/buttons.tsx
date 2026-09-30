import { ReactNode } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { GestureResponderEvent } from "react-native";

type DefaultButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
};

type functionButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  children: ReactNode; //enable children
};

export function DefaultButton({ onPress, title }: DefaultButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export function ExpandButton({
  onPress,
  title,
  children,
}: functionButtonProps) {
  //if no children render text
  return (
    <Pressable style={styles.expandButton} onPress={onPress}>
      {children ? children : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

export function DeleteButton({
  onPress,
  title,
  children,
}: functionButtonProps) {
  return (
    <Pressable style={styles.deleteButton} onPress={onPress}>
      {children ? children : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

export function RenameButton({
  onPress,
  title,
  children,
}: functionButtonProps) {
  return (
    <Pressable style={styles.renameButton} onPress={onPress}>
      {children ? children : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
}

export function AddButton({ onPress, title, children }: functionButtonProps) {
  return (
    <Pressable style={styles.addButton} onPress={onPress}>
      {children ? (
        children
      ) : (
        <Text style={{ color: "white", fontSize: 16 }}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ABDF75",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  expandButton: {
    backgroundColor: "#ABDF75",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  deleteButton: {
    backgroundColor: "#ca3e3e",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  renameButton: {
    backgroundColor: "#D6F9DD",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  addButton: {
    backgroundColor: "#60695C",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.23)",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
});
