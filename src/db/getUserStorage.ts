import { type SQLiteDatabase } from "expo-sqlite";
import type { UserContainer } from "../types/userContainer";

type container = {
  id: number
  name: string
}

type compartment = {
  id: number
  name: string
  parentID: number
}

type item = {
  id: number
  name: string
  parentID: number
  amount: number
}

export default async function getUserStorage(
  db: SQLiteDatabase,
): Promise<UserContainer[] | "No Data Found"> {
 
  try {
    const userContainers: container[] =  await db.getAllAsync('SELECT * FROM userContainers');
    const userCompartments: compartment[] = await db.getAllAsync('SELECT * FROM userCompartments');
    const userItems: item[] = await db.getAllAsync('SELECT * FROM userItems');

    const userData: UserContainer[] = userContainers.map(
      (container) => ({
        id: container.id,
        name: container.name,
        compartments: userCompartments.filter((compartment) => compartment.parentID === container.id).map(
          (compartment) => ({
            id: compartment.id,
            name: compartment.name,
            parentID: compartment.parentID,
            items: userItems.filter((item) => item.parentID === compartment.id).map((item) => ({
              id: item.id,
              name: item.name,
              parentID: item.parentID,
              amount: item.amount
            }))
          })
        )}
      )
    )

    return userData;
  } catch {
    //add error handling
    return "No Data Found";
  }}
