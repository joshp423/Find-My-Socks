import { Text, View } from "react-native";
import { AddButton } from "./Buttons";
import AntDesign from "@expo/vector-icons/AntDesign";

type NoDataRowProps = {
    type: "compartment" | "item";
    setNewCompartmentToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NoDataRow({ type, setNewCompartmentToggle}: NoDataRowProps) {
    return (
        <View>
            <Text>No {type}s</Text>
            <AddButton 
                onPress={() => setNewCompartmentToggle(true)}
                title="Add"
                children={<AntDesign name="plus" size={16} color="white" />}
            />
        </View>
    )
}