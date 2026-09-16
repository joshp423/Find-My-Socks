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
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});