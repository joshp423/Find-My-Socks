import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

type CreateProfileProps = {
  userStorage: AsyncStorage;
};

export function CreateProfile({ userStorage }: CreateProfileProps) {
  const [profileName, onChangeProfileName] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text>Enter User Name:</Text>
      <TextInput
        onChangeText={onChangeProfileName}
        editable
        style={styles.input}
        maxLength={20}
      />
      <Button
        title="Submit"
        onPress={() => {
          userStorage.setItem("userProfile", profileName);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  input: {
    width: "60%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
