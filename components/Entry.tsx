'use client';

import { EntryFormat } from "@/app/EntryManager";
import { ChevronRight } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"
import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "./ui/button";

export default function Entry({data}:{data: EntryFormat}){
    const [openDetails, setOpenDetails] = useState(false)
    return <>
    <button onClick={()=> setOpenDetails(true)} className="w-full flex items-center px-5 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 active:scale-95 transition-all rounded-lg mt-2 h-[65px]">
        <div className="flex flex-col text-left">
            <h1 className="font-semibold">{data.name}</h1>
            <p className="text-sm opacity-70">{new Date(Number(data.createdOn)).toLocaleString()}</p>
        </div>
        <div className="flex-1"/>
        <ChevronRight className="opacity-50" strokeWidth={'1.75px'}/>
    </button>
        <Drawer open={openDetails} onOpenChange={setOpenDetails}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{data.name}</DrawerTitle>
                    <DrawerDescription>Created on {new Date(Number(data.createdOn)).toLocaleString()}</DrawerDescription>
                </DrawerHeader>
                <div className="h-[200px] flex items-center justify-center">
                    <QRCode value={data.data} size={175} />
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button className="w-full" variant={"secondary"}>Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    </>
}