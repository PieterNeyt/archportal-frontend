import {Skeleton} from "@heroui/react";


export function AchievementsTabContentSkeleton() {
    return (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-4 w-1/3 rounded-lg" />
                    <Skeleton className="h-3 w-2/3 rounded-lg" />
                </div>
            </div>
        ))}
    </div>)
}