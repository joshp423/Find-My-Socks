import { type SQLiteDatabase } from "expo-sqlite";
import { type ItemSearchResults } from "../types/itemSearchResults";

type SearchResultsFull = {
  id: number;
  itemName: string;
  amount: number;
  compartmentName: string;
  containerName: string;
};

export default async function search(
  searchTerm: string,
  db: SQLiteDatabase,
): Promise<ItemSearchResults[] | "No Item Found"> {
  const statement = await db.prepareAsync(
    `SELECT userItems.id,
         userItems.name AS itemName,
         userItems.amount,
         userCompartments.name AS compartmentName, 
         userContainers.name AS containerName
         FROM userItems
         INNER JOIN userCompartments ON userItems.parentID=userCompartments.id
         INNER JOIN userContainers ON userCompartments.parentID=userContainers.id
         WHERE userItems.name = $searchTerm`,
  );
  try {
    const searchResultsFull = await statement.executeAsync<SearchResultsFull>({
      $searchTerm: searchTerm,
    });

    const searchResultsArray = await searchResultsFull.getAllAsync();

    if (searchResultsArray.length === 0) return "No Item Found";

    const searchResults: ItemSearchResults[] = searchResultsArray.map(
      (row) => ({
        id: row.id,
        name: row.itemName,
        amount: row.amount,
        parent: {
          name: row.compartmentName,
          parent: {
            name: row.containerName,
          },
        },
      }),
    );

    return searchResults;
  } catch {
    //add error handling
    return "No Item Found";
  } finally {
    //clean up memory allocation
    await statement.finalizeAsync();
  }
}
