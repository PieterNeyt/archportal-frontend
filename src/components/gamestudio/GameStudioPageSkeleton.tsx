import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {Skeleton} from "@heroui/skeleton";


export function GameStudioPageSkeleton(){
    return ( <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8">
        <div className={`${GLASS_CARD_STYLES} p-8 space-y-4`}>
            <div className="flex justify-between">
                <Skeleton className="w-1/3 h-8 rounded-lg bg-white/10"/>
                <Skeleton className="w-24 h-10 rounded-lg bg-white/10"/>
            </div>
            <Skeleton className="w-full h-4 rounded-lg bg-white/5"/>
        </div>
        <div className="space-y-4">
            <Skeleton className="w-48 h-8 rounded-lg bg-white/10"/>
            {[1, 2, 3].map((i) => (
                <div key={i} className={`${GLASS_CARD_STYLES} h-24 w-full bg-white/5`}/>
            ))}
        </div>
    </div>)
}