import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useState } from 'react';

type Props = StaticScreenProps<{
  user: string;
}>;

export function Profile({ route }: Props) {
  const [editProfile, setEditProfile] = useState<boolean>(false);


  return (
    <View style={styles.container}>
      <Text>User: {route.params.user}</Text>
      <Button
      title='Edit'
      ></Button>
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
