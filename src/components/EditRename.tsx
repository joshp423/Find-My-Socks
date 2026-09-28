import { GestureResponderEvent } from 'react-native';
import { Pressable, Text, StyleSheet, TextInput, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


type EditDataProps = {
    onPressConfirm: ((event: GestureResponderEvent) => void) | undefined
    onPressCancel: ((event: GestureResponderEvent) => void) | undefined
    value: string
}

type EditDataAmountProps = {
    onPressConfirm: ((event: GestureResponderEvent) => void) | undefined
    onPressCancel: ((event: GestureResponderEvent) => void) | undefined
    name: string
    amount: number
}

export function EditData({onPressConfirm, onPressCancel, value}: EditDataProps) {
    return(
        <View>
            <TextInput value={value} />
            <Pressable onPress={onPressConfirm}><AntDesign name="x" size={16} color="black" /></Pressable>
            <Pressable onPress={onPressCancel}><AntDesign name="check" size={16} color="black" /></Pressable>
        </View>
    )
}

export function EditDataAmount({onPressConfirm, onPressCancel, name, amount}: EditDataAmountProps) {
    //need numeric confirmation
    return(
        <View>
            <TextInput value={name}/>
            <TextInput value={String(amount)} keyboardType="numeric" /> 
            <Pressable onPress={onPressConfirm}><AntDesign name="x" size={16} color="black" /></Pressable>
            <Pressable onPress={onPressCancel}><AntDesign name="check" size={16} color="black" /></Pressable>
        </View>
    )
}