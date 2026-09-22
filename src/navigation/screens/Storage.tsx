import { Text } from "@react-navigation/elements";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { userStorage } from "../../types/userCompartment";

export function Storage() {
  const [userStorage, setUserStorage] = useState<userStorage | null>(null);
  

  return (
    <View style={styles.container}>
      <Text>Storage Screen Bre</Text>
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
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
