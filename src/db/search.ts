import { type SQLiteDatabase } from "expo-sqlite";


export default async function search(searchTerm: string, db: SQLiteDatabase) {
    const statement = await db.prepareAsync('SELECT * FROM userItems WHERE name = searchTerm')
    try {
        const searchResultsBool = await statement.executeAsync<{searchTerm: string}>({
            searchTerm
        })
        if (!searchResultsBool) return "No Item Found"

    } catch {
        
    }


    
}