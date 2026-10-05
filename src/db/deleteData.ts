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
  switch (itemType) {
    case "compartment": {
      try {
        await db.execAsync(
          `DELETE FROM userItems WHERE parentID = ${itemId};
          DELETE FROM userCompartments WHERE id = ${itemId};`,
        );
      } catch {
        await db.execAsync("ROLLBACK"); //rollback on error
        return "An error occured";
      }
      break;
    }
    case "container": {
      try {
        await db.execAsync(
          //use transaction and execAsnyc for multi-queries, also use template literal
          `BEGIN;
          DELETE FROM userItems WHERE parentId IN
            (SELECT id FROM userCompartments WHERE parentId = ${itemId});
          DELETE FROM userCompartments WHERE parentID = ${itemId};
          DELETE FROM userContainers WHERE id = ${itemId};
          COMMIT;`,
        );
      } catch {
        await db.execAsync("ROLLBACK"); //rollback on error
        return "An error occured";
      }
      break;
    }
    case "item": {
      try {
        await db.execAsync(`DELETE FROM userItems WHERE id = ${itemId}`);
      } catch {
        await db.execAsync("ROLLBACK"); //rollback on error
        return "An error occured";
      }
      break;
    }
  }
  return;
}
