import {Skeleton} from "@heroui/skeleton";

interface MessageSkeletonCardProps {
    isYours?: boolean;
}

export default function MessageSkeletonCard({isYours = false}: MessageSkeletonCardProps) {
    const skeletonClass = "bg-white/10 before:bg-white/5 after:bg-white/20 dark:bg-white/10";

    return (
        <div className={`flex gap-3 ${isYours ? 'flex-row-reverse' : 'flex-row'}`}>
            <Skeleton className={`w-10 h-10 rounded-full flex-shrink-0 ${skeletonClass}`} />
            <div className={`flex flex-col ${isYours ? 'items-end' : 'items-start'} max-w-md`}>
                <Skeleton className={`rounded-2xl px-4 py-2 w-48 h-8 ${skeletonClass}`} />
                <Skeleton className={`w-20 h-3 mt-2 rounded-lg ${skeletonClass}`} />
            </div>
        </div>
    );
}