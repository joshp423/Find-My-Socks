import { type SQLiteDatabase } from "expo-sqlite";

export default async function search(searchTerm: string, db: SQLiteDatabase) {
  const statementBool = await db.prepareAsync(
    "SELECT * FROM userItems WHERE name = $searchTerm",
  );
  const statementFull = await db.prepareAsync(
    `SELECT userItems.id,
         userItems.name AS itemName,
         userItems.amount,
         userCompartments.name AS compartmentName, 
         userContainers.name AS containerName
         FROM userItems
         INNER JOIN userCompartments ON userItems.parentID=userCompartments.id
         INNER JOIN userContainers ON userCompartments.parentID=userContainers.id
         WHERE itemName = $searchTerm`,
  );
  try {
    const searchResultsBool = await statementBool.executeAsync<{
      $searchTerm: string;
    }>({ searchTerm });
    if (!searchResultsBool) return "No Item Found";
  } catch {}
}
