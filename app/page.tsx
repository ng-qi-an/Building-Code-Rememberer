'use client';

import ScannerDialog from "@/components/ScannerDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import EntryManager, { EntryFormat } from "./EntryManager";
import { v4 } from "uuid";
import Entry from "@/components/Entry";

export default function Home(){
  const [pauseScanner, setPauseScanner] = useState(false)
  const [open, setOpen] = useState(false)
  const [entries, setEntries] = useState<EntryFormat[]>([])
  useEffect(()=>{
    (async()=>{
      const storedEntries = await EntryManager.getAll()
      setEntries(storedEntries)
    })();
  }, [])
  return <div className="py-4 px-6 flex flex-col">
    <div className="mb-4">
      <h1 className="text-3xl font-bold mt-6">Your Entries</h1>
      <Input placeholder="Search for an entry" className="mt-3 border-none bg-black/5 dark:bg-white/5 text-sm h-[35px] px-4"/>
    </div>
    {entries.map((entry)=>{
      return <Entry data={entry} key={entry.id}/>
    })}
    <ScannerDialog open={open} setOpen={setOpen} onCompleted={(result:IDetectedBarcode[])=>{
      (async()=>{
        await EntryManager.addEntry({
          id: v4(),
          name: "Untitled",
          createdOn: new Date().getTime().toString(),
          data: result[0].rawValue,
          format: result[0].format
        });
        setOpen(false);
        setEntries(await EntryManager.getAll())
      })()
    }}/>
    <Button onClick={()=> setOpen(true)} className="fixed bottom-8 right-6 rounded-full h-[60px] w-[60px]" size="icon">
      <Plus />
    </Button>
  </div>
}