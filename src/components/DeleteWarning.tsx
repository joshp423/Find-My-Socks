import { Pressable, Text, StyleSheet, View } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


type DeleteWarningProps = {
    onPressConfirm: ((event: GestureResponderEvent) => void) | undefined
    onPressCancel: ((event: GestureResponderEvent) => void) | undefined
}
export function DeleteWarning({onPressConfirm, onPressCancel}: DeleteWarningProps) {
    return(
        <View>
            <Text>Are you sure you want to delete this?</Text>
            <Text>Any child data will also be deleted.</Text>
            <View>
                <Pressable onPress={onPressCancel} style={styles.cancelButton}><AntDesign name="close" size={16} color="black" /></Pressable>
                <Pressable onPress={onPressConfirm} style={styles.submitButton}><AntDesign name="check" size={16} color="black" /></Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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