import { ReactNode } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { GestureResponderEvent } from 'react-native';

type DefaultButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined
  title: string
}

type ExpandButtonProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined
  title: string
  children: ReactNode //enable children
}

export function DefaultButton({ onPress, title }: DefaultButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export function ExpandButton({ onPress, title, children }: ExpandButtonProps) {
  //if no children render text
  return (
    <Pressable style={styles.expandButton} onPress={onPress}>
      {children ? children : <Text style={styles.text}>{title}</Text>} 
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
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.23)',
  },
  expandButton: {
    backgroundColor: '#ABDF75',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.23)',
  },
  text: {
    color: 'black',
    fontSize: 16,
  },
});