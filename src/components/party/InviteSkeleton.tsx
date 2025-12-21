import {Skeleton} from "@heroui/skeleton";

export default function InviteSkeleton() {
    return (
        <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/5">
            <div className="flex items-center gap-3 flex-1">
                {/* Avatar Skeleton */}
                <Skeleton className="flex rounded-full w-10 h-10 bg-white/10"/>
                <div className="flex flex-col gap-2 flex-1">
                    {/* Title & Description Skeletons */}
                    <Skeleton className="h-4 w-3/4 rounded-lg bg-white/10"/>
                    <Skeleton className="h-3 w-1/2 rounded-lg bg-white/5"/>
                </div>
            </div>
            <div className="flex gap-2">
                {/* Button Skeletons */}
                <Skeleton className="w-10 h-10 rounded-lg bg-white/10"/>
                <Skeleton className="w-20 h-10 rounded-lg bg-white/10"/>
            </div>
        </div>
    );
}