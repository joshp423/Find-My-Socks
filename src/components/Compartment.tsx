import { userCompartment } from "../types/userCompartment";
import { UserItem } from "../types/userItem";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ExpandButton } from "./Buttons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";


type CompartmentProps = {
    compartmentData: userCompartment
    viewedContainerExpand: boolean
  }

type ItemProps = {
    itemData: UserItem
  }

export default function Compartment({compartmentData, viewedContainerExpand}: CompartmentProps){
    const [compartmentContainerExpand, setCompartmentContainerExpand] = useState<boolean>(false);

    const Item = ({itemData}: ItemProps) => (
        //style these
        <View style={compartmentContainerExpand ? styles.userItem : styles.disabled}>
        <Text >{itemData.name}</Text>
        </View>

    )

    return(
        <View style={viewedContainerExpand ? styles.userCompartment : styles.disabled}>
        <View style={styles.userCompartmentControlRow}>
            <Text style={styles.compartmentTitle}>{compartmentData.name}</Text>
            <ExpandButton
                title=""
                onPress={() => {setCompartmentContainerExpand(prev => !prev)}}
                children={!compartmentContainerExpand ? <AntDesign name="arrow-down" size={16} color="black" /> : <AntDesign name="arrow-up" size={16} color="black" />}
            />
        </View>
        <FlatList 
            data={compartmentData.items}
            renderItem={({item}) => <Item itemData={item} /> }
        />
        </View>
    );
}

  

const styles = StyleSheet.create({
    userCompartment: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        gap: 20,
    },
    userCompartmentControlRow: {
        width: "100%",
        padding: 5,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    compartmentTitle: {
        
    },
    disabled: {
        display: "none",
    },
    userItem: {

    }


})