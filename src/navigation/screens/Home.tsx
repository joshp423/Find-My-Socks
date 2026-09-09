import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

import { createAsyncStorage } from "@react-native-async-storage/async-storage";

// create a storage instance
const storage = createAsyncStorage("appDB");

async function demo() {
  await storage.setItem("userToken", "abc123");

  const token = await storage.getItem("userToken");
  console.log("Stored token:", token); // abc123

  await storage.removeItem("userToken");
}
demo()

export function Home() {
  return (
    <View style={styles.container}>
      <Text>Find My Socks</Text>
      <Text>Open up 'src/App.tsx' to start working on your app!</Text>
      <Button screen="Profile" params={{ user: 'jane' }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
