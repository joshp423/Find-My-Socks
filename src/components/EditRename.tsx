import { GestureResponderEvent } from 'react-native';
import { Pressable, Text, StyleSheet, TextInput, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import updateData from '../db/updateData';


type EditDataProps = {
    onPressCancel: ((event: GestureResponderEvent) => void) | undefined
    value: string
}

type EditDataAmountProps = {
    onPressCancel: ((event: GestureResponderEvent) => void) | undefined
    name: string
    amount: number
}

export function EditData({onPressCancel, value}: EditDataProps) {
    const [dataTitle, setDataTitle] = useState<string>(value)
    return(
        <>
            <TextInput value={dataTitle} style={styles.input} onChangeText={setDataTitle}/>
            <View style={styles.buttonContainer}>
                <Pressable onPress={onPressCancel} style={styles.cancelButton}><AntDesign name="close" size={16} color="black" /></Pressable>
                <Pressable onPress={updateData()} style={styles.submitButton}><AntDesign name="check" size={16} color="black" /></Pressable>
            </View>
        </>
    )
}

export function EditDataAmount({onPressCancel, name, amount}: EditDataAmountProps) {
    //need numeric confirmation
    return(
        <View>
            <TextInput value={name}/>
            <TextInput value={String(amount)} keyboardType="numeric" /> 
            <Pressable onPress={}><AntDesign name="x" size={16} color="black" /></Pressable>
            <Pressable onPress={onPressCancel}><AntDesign name="check" size={16} color="black" /></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "50%",
        height: "auto",
        padding: 5,
        paddingLeft: 10,
        borderRadius: 16,
        backgroundColor: "white"
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 5
    },
    submitButton: {
        backgroundColor: '#ABDF75',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.23)',
    },
    cancelButton: {
        backgroundColor: '#ca3e3e',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.23)',
    }
})