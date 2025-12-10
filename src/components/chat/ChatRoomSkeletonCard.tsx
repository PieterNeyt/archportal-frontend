import { Skeleton } from "@heroui/skeleton";

export default function ChatRoomSkeletonCard() {
    // We gebruiken de dark mode classes voor het glass effect
    const skeletonClass = "bg-white/5 dark:bg-white/10 rounded-lg";

    return (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent">
            {/* Avatar Skeleton */}
            <Skeleton className={`w-12 h-12 rounded-full flex-shrink-0 ${skeletonClass}`} />

            {/* Content Skeleton */}
            <div className="flex-1 flex flex-col gap-2 min-w-0">
                {/* Title + Time bar */}
                <div className="flex justify-between items-center w-full">
                    <Skeleton className={`h-4 w-24 ${skeletonClass}`} />
                    <Skeleton className={`h-3 w-10 ${skeletonClass}`} />
                </div>

                {/* Message bar */}
                <Skeleton className={`h-3 w-3/4 ${skeletonClass}`} />
            </div>
        </div>
    );
}