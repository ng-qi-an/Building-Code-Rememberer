'use client';

import { outline, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { toast } from "sonner";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"
  

export default function ScannerDialog({open, setOpen, onCompleted}:{open: boolean, setOpen: (open: boolean)=>void, onCompleted: any}){
  const [pauseScanner, setPauseScanner] = useState(false)
  return <Drawer open={open} onOpenChange={setOpen}>
  <DrawerContent>
    <DrawerHeader >
      <DrawerTitle>Add Entry</DrawerTitle>
      <DrawerDescription>
        Scan the QR Code that you want to save
      </DrawerDescription>
    </DrawerHeader>
    <div className="flex flex-col items-center w-full pb-[40px]">
      <div className="max-w-[300px] w-full h-[300px] flex items-center justify-center">
      <Scanner styles={{container: {"borderRadius": '10px', overflow: 'hidden'}}} allowMultiple paused={pauseScanner} scanDelay={2000} onScan={(e)=> {
          setPauseScanner(true)
          onCompleted(e)
      }} onError={(e)=>{
          //@ts-ignore
          toast.error(e)
      }} components={{audio: false, zoom: false, torch: false, finder: false, tracker: outline}}/>
      </div>
    </div>
  </DrawerContent>
</Drawer>
}