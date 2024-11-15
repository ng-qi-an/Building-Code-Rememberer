import localforage from "localforage"

export default {
    getAll,
    getEntry,
    addEntry,
    deleteEntry,
    editEntry
}

export type EntryFormat = {
    id: string,
    name: string,
    createdOn: string,
    data: string,
    format: string
}

async function getAll(): Promise<EntryFormat[]> {
    return await localforage.getItem("entries") || []
}

async function getEntry(id:string){
    const entries = await getAll() 
    return entries.find((entry)=> entry.id == id)
}

async function addEntry(entry: EntryFormat){
    const entries = await getAll()
    entries.push(entry)
    await localforage.setItem("entries", entries)
}

async function deleteEntry(id: string){
    const entries = await getAll()
    const newEntries = entries.filter((entry)=> entry.id != id)
    await localforage.setItem("entries", newEntries)
}

async function editEntry(id: string, entry: EntryFormat){
    const entries = await getAll()
    const newEntries = [...entries]
    await deleteEntry(id)
    newEntries.splice(newEntries.findIndex((entry)=> entry.id == id), 1, entry)
    await localforage.setItem("entries", newEntries)
}