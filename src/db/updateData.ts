import { type SQLiteDatabase } from "expo-sqlite";

type updateDataProps = {
  itemId: number;
  itemType: "container" | "compartment" | "item";
  itemName: string;
  amount?: number;
  db: SQLiteDatabase;
};

export default async function updateData({
  itemId,
  itemType,
  itemName,
  db,
  amount,
}: updateDataProps) {
  const statementContainer = await db.prepareAsync(
    "UPDATE userContainers SET name = $value WHERE id = $itemId",
  );
  const statementCompartment = await db.prepareAsync(
    "UPDATE userCompartments SET name = $value WHERE id = $itemId",
  );
  const statementAmount = await db.prepareAsync(
    "UPDATE userItems SET name = $value, amount = $amount WHERE id = $itemId",
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
        await statementAmount.executeAsync({
          $value: itemName,
          $amount: String(amount),
          $itemId: itemId,
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
