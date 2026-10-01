import { type SQLiteDatabase } from "expo-sqlite";

type updateDataProps = {
  itemId: number;
  itemType: "container" | "compartment" | "item";
  itemName: string;
  amount?: number;
  db: SQLiteDatabase;
};

export default async function deleteData({
  itemId,
  itemType,
  itemName,
  db,
}: updateDataProps) {
  const statementContainer = await db.prepareAsync(
    `DELETE userContainers 
        JOIN userCompartments
        ON userCompartments.parentId=userContainers.id
        JOIN userItems
        ON userItems.parentId=userCompartments.id
        WHERE id = $itemId`,
  );
  const statementCompartment = await db.prepareAsync(
    `DELETE userCompartments
        JOIN userItems.parentId=userCompartments.id
        WHERE id = $itemId`,
  );
  const statementItem = await db.prepareAsync(
    "DELETE userItems WHERE id = $itemId",
  );

  switch (itemType) {
    case "compartment": {
      try {
        await statementCompartment.executeAsync({
          $value: itemName,
          $itemId: itemId,
        });
      } catch {
        return "An error occured";
      } finally {
        await statementCompartment.finalizeAsync();
      }
      break;
    }
    case "container": {
      try {
        await statementContainer.executeAsync({
          $value: itemName,
          $itemId: itemId,
        });
      } catch {
        return "An error occured";
      } finally {
        await statementContainer.finalizeAsync();
      }
      break;
    }
    case "item": {
      try {
        await statementItem.executeAsync({
          $value: itemName,
          $itemId: itemId,
        });
      } catch {
        return "An error occured";
      } finally {
        await statementItem.finalizeAsync();
      }
      break;
    }
  }
  return;
}
