import { type SQLiteDatabase } from "expo-sqlite";

type createDataProps = {
  itemName: string;
  itemType: "container" | "compartment" | "item";
  itemAmount?: number;
  parentId?: number;
  db: SQLiteDatabase;
};

export default async function createData({
  itemName,
  itemType,
  itemAmount,
  parentId,
  db,
}: createDataProps) {
  switch (itemType) {
    case "compartment": {
      if (!parentId) return;
      const statementCompartment = await db.prepareAsync(
        "INSERT INTO userCompartments (parentID, name) VALUES ($parentID, $itemName)",
      );
      try {
        await statementCompartment.executeAsync({
          $itemName: itemName,
          $parentID: parentId,
        });
      } catch {
        return "An error occured";
      } finally {
        await statementCompartment.finalizeAsync();
      }
      break;
    }
    case "container": {
      const statementContainer = await db.prepareAsync(
        "INSERT INTO userContainers (name) VALUES ($itemName)",
      );
      try {
        await statementContainer.executeAsync({
          $itemName: itemName,
        });
      } catch {
        return "An error occured";
      } finally {
        await statementContainer.finalizeAsync();
      }
      break;
    }
    case "item": {
      if (!parentId || !itemAmount) return;
      const statementAmount = await db.prepareAsync(
        "INSERT INTO userItems (parentID, name, amount) VALUES ($parentID, $itemName, $amount)",
      );
      try {
        await statementAmount.executeAsync({
          $itemName: itemName,
          $parentID: parentId,
          $amount: itemAmount,
        });
      } catch {
        return "An error occured";
      } finally {
        await statementAmount.finalizeAsync();
      }
      break;
    }
  }
  return;
}
