import { Pressable, Text, StyleSheet } from 'react-native';
import { GestureResponderEvent } from 'react-native';

type ButtonProps = {
    onPress: ((event: GestureResponderEvent) => void) | undefined
    title: string
}

export default function MyButton({ onPress, title }: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ABDF75',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#60695C',
    borderStyle: "solid",
    borderWidth: 1,
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});