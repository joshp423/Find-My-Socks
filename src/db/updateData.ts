import { type SQLiteDatabase } from "expo-sqlite";


type updateDataProps = {
    itemId: number;
    itemType: "container" | "compartment" | "item";
    itemName: string;
    amount?: number;
    db: SQLiteDatabase;
}

export default async function updateData({itemId, itemType, itemName, db, amount}: updateDataProps){



    const statement = await db.prepareAsync(
        `UPDATE $table
            SET name = $value
            WHERE id = $itemId
        `
    )
    const statementAmount = await db.prepareAsync(
        `UPDATE $table
            SET name = $value, amount = $amount
            WHERE id = $itemId
        `
    )

    switch(itemType) {
        case "compartment": {
            try {
                await statement.executeAsync({
                    $table: "userCompartments",
                    $value: itemName,
                    $itemId: itemId
                })
            } catch {
                return "An error occured"
            } finally {
                await statement.finalizeAsync();
            }
        };
        case "container": {
            try {
                await statement.executeAsync({
                    $table: "userContainers",
                    $value: itemName,
                    $itemId: itemId
                })
            } catch {
                return "An error occured"
            } finally {
                await statement.finalizeAsync();
            }
        };
        case "item": {
            try {
                await statementAmount.executeAsync({
                    $table: "userContainers",
                    $value: itemName,
                    $amount: amount,
                    $itemId: itemId
                })
            } catch {
                return "An error occured"
            } finally {
                await statementAmount.finalizeAsync();
            }
        };
    }
}
