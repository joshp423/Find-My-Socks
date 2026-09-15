import { useSQLiteContext } from "expo-sqlite";


export default async function search(searchTerm: string) {
    const db = useSQLiteContext();
    const statement = await db.prepareAsync('SELECT * FROM userItems WHERE name = searchTerm')
    try {
        const searchResultsBool = await statement.executeAsync<{searchTerm: string}>({
            searchTerm
        })
        if (!searchResultsBool) return "No Item Found"
    } catch {
        
    }


    
}