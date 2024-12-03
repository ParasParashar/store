import React from "react";
import { TbWashGentle, TbBleachOff, TbWashDrycleanOff, TbWashDry1, TbIroning, TbIroningOff } from "react-icons/tb";

type WashingInstruction = {
    id: number;
    title: string;
    icon: React.ComponentType;
};

const washingInstructions: WashingInstruction[] = [
    {
        id : 101,
        title : "Gentle wash",
        icon: TbWashGentle
    },
    {
        id : 102,
        title : "Do not bleach",
        icon : TbBleachOff
    },
    {
        id : 103,
        title : "Do not dry clean",
        icon : TbWashDrycleanOff
    },
    {
        id : 104,
        title : "Tumble dry low",
        icon : TbWashDry1
    },
    {
        id : 105,
        title : "Medium iron",
        icon : TbIroning
    },
    {
        id : 106,
        title : "Do not iron on print",
        icon : TbIroningOff 
    },
    
]

export default washingInstructions;

