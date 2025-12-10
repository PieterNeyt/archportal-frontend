import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {Skeleton} from "@heroui/skeleton";

export function GamePageLoadSkeleton() {
    return (
        <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 animate-pulse">
            <div>
                <Skeleton className="h-10 w-48 rounded-medium bg-white/10" />
            </div>

            <section className={`${GLASS_CARD_STYLES} p-6 sm:p-8 relative overflow-hidden`}>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <Skeleton className="aspect-[3/4] rounded-xl bg-white/10" />
                    </div>

                    <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start gap-4 mb-6">
                            <div className="space-y-3 w-full">
                                <Skeleton className="h-10 w-3/4 rounded-lg bg-white/10" />
                                <Skeleton className="h-4 w-1/4 rounded-lg bg-white/5" />
                            </div>
                            <Skeleton className="h-10 w-32 rounded-medium bg-white/10 shrink-0" />
                        </div>

                        <div className="my-6 h-px w-full bg-white/10" />

                        <div className="space-y-4 flex-grow">
                            <Skeleton className="h-3 w-24 rounded-lg bg-white/5 uppercase" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full rounded-lg bg-white/10" />
                                <Skeleton className="h-4 w-full rounded-lg bg-white/10" />
                                <Skeleton className="h-4 w-5/6 rounded-lg bg-white/10" />
                                <Skeleton className="h-4 w-4/6 rounded-lg bg-white/10" />
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-16 rounded-lg bg-white/5 uppercase" />
                                <Skeleton className="h-8 w-24 rounded-lg bg-white/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <section key={i} className={`${GLASS_CARD_STYLES} p-6 h-64 flex flex-col`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-6 h-6 rounded-full bg-white/10" />
                                <Skeleton className="w-32 h-6 rounded-lg bg-white/10" />
                            </div>
                            <Skeleton className="w-10 h-10 rounded-medium bg-white/10" />
                        </div>
                        <Skeleton className="flex-grow rounded-xl bg-white/5 border border-white/5" />
                    </section>
                ))}
            </div>
        </div>
    );
}