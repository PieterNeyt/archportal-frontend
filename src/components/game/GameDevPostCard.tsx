import {MessageSquare, Plus} from "lucide-react";
import {Button} from "@heroui/button";


export function GameDevPostCard(){
    return (<>
        <div className="flex items-center justify-between mb-4 z-10">
            <div className="flex items-center gap-3">
                <MessageSquare className="text-primary" size={20}/>
                <h2 className="text-xl font-bold text-white">Developer Posts</h2>
            </div>
            <Button
                isIconOnly
                isDisabled
                variant="flat"
                className="bg-white/5 text-white/40"
            >
                <Plus size={20}/>
            </Button>
        </div>
        <div
            className="flex-grow flex items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-white/5">
            <p className="text-white/40 font-medium">Coming Soon</p>
        </div>
    </>)
}