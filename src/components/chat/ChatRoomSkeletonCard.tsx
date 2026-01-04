import { Skeleton } from "@heroui/skeleton";

export default function ChatRoomSkeletonCard() {
    const skeletonClass = "bg-white/5 dark:bg-white/10 rounded-lg";

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent">
            <Skeleton className={`w-12 h-12 rounded-full flex-shrink-0 ${skeletonClass}`} />
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                <div className="flex justify-between items-center w-full">
                    <Skeleton className={`h-4 w-24 ${skeletonClass}`} />
                    <Skeleton className={`h-3 w-10 ${skeletonClass}`} />
                </div>
                <Skeleton className={`h-3 w-3/4 ${skeletonClass}`} />
            </div>
        </div>
    );
}