import { useGameStatistics } from "@/hooks/useAnalytics.ts";
import { GlobalGameDto } from "@/model/library.ts";
import { Image } from "@heroui/image";
import { GLASS_CARD_STYLES } from "@/styles/customClasses.ts";
import { AlertCircle, Loader2 } from "lucide-react";

interface ProfileGameCardProps {
    game: GlobalGameDto;
}

export function ProfileGameCard({ game }: ProfileGameCardProps) {
    const { isError, isLoading, gameStatistics } = useGameStatistics(game.id);

    return (
        <div className={`${GLASS_CARD_STYLES} relative p-6 flex flex-col items-center gap-4 w-full h-full border-white/5 hover:border-white/20 transition-all group`}>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5">
                <Image
                    alt={game.title}
                    radius="none"
                    removeWrapper
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isError ? 'opacity-50 grayscale-[0.5]' : ''}`}
                    src={game.imageUrl}
                />
            </div>
            <div className="flex flex-col items-center text-center space-y-2 w-full mt-auto">
                <h3 className="text-sm font-black text-white uppercase tracking-tighter line-clamp-1">
                    {game.title}
                </h3>

                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-colors ${
                    isError
                        ? "bg-red-500/10 border-red-500/20"
                        : "bg-white/5 border-white/10"
                }`}>
                    {isLoading ? (
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 text-white/20 animate-spin" />
                            <span className="text-[10px] text-white/20 font-mono uppercase font-bold">Loading...</span>
                        </div>
                    ) : isError || !gameStatistics ? (
                        <div className="flex items-center gap-1.5">
                            <AlertCircle className="w-3 h-3 text-red-500" />
                            <p className="text-[10px] text-red-400 font-mono uppercase font-bold tracking-tight">
                                Stats unavailable
                            </p>
                        </div>
                    ) : (
                        <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest font-bold">
                            <span className="text-white">
                                {((gameStatistics.totalPlayTimeMinutes || 0) / 60).toFixed(2)}
                            </span> HOURS PLAYED
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}