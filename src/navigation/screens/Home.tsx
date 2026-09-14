import { Button, Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';
import { CreateProfile } from './CreateProfile';

import { createAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect, useState } from 'react';

// create a storage instance
export const userStorage = createAsyncStorage("appDB");

// async function demo() {
//   await userStorage.setItem("userToken", "abc123");

//   const token = await userStorage.getItem("userToken");
//   console.log("Stored token:", token); // abc123

//   await userStorage.removeItem("userToken");
// }
// demo()

export function Home() {
  const [userProfileCheck, setUserProfileCheck] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    async function load() {
      const user = await userStorage.getItem("userProfile");
      if (user) {
        setUserProfileCheck(true);
        setUsername(user);
        return;
      }
      setUserProfileCheck(false);
      return;
    }
    load();
  },[])

  if (!userProfileCheck) {
    return (
      <CreateProfile />
    )
  }
  return (
    <View style={styles.container}>
      <Text>Find My Socks</Text>
      <Button screen="Profile" params={{ user: username }}>
        Go to Profile
      </Button>
      <Button screen="Settings">Go to Settings</Button>
      <Button screen="Storage">Manage Storage</Button>
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
