import {Skeleton} from "@heroui/skeleton";

export default function FriendSkeletonCard() {
    const skeletonClass = "bg-white/10 before:bg-white/5 after:bg-white/20 dark:bg-white/10";

    return (
        <div
            className={"backdrop-blur-sm flex items-center justify-between p-3 rounded-xl border border-border hover:bg-accent transition-colors cursor-pointer shadow-md"}
        >
            <div className="flex items-center space-x-3">
                <Skeleton
                    className={`w-10 h-10 rounded-full flex-shrink-0 ${skeletonClass}`}
                />

                <div className="flex flex-col space-y-1">
                    <Skeleton
                        className={`w-32 h-6 rounded-lg ${skeletonClass}`}
                    />
                </div>
            </div>
        </div>
    );
};