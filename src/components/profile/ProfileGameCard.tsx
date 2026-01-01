import { useGameStatistics } from "@/hooks/useAnalytics.ts";
import { GlobalGameDto } from "@/model/library.ts";
import { Image } from "@heroui/image";
import { GLASS_CARD_STYLES } from "@/styles/customClasses.ts";

interface ProfileGameCardProps {
    game: GlobalGameDto;
}

export function ProfileGameCard({ game }: ProfileGameCardProps) {
    const { isError, isLoading, gameStatistics } = useGameStatistics(game.id);

    if (isLoading) {
        return (
            <div className={`${GLASS_CARD_STYLES} p-4 flex flex-col items-center gap-4 w-full h-full border-white/5 opacity-50`}>
                <div className="w-full aspect-video bg-white/5 rounded-xl" />
            </div>
        );
    }

    if (isError || !gameStatistics) return null;

    const playTimeHours = (gameStatistics.totalPlayTimeMinutes / 60).toFixed(1);

    return (
        <div className={`${GLASS_CARD_STYLES} relative p-6 flex flex-col items-center gap-4 w-full h-full border-white/5`}>
            {/* Foto deel - Geen zoom meer */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image
                    alt={game.title}
                    radius="none"
                    removeWrapper
                    className="w-full h-full object-cover"
                    src={game.imageUrl}
                />
            </div>

            {/* Content deel */}
            <div className="flex flex-col items-center text-center space-y-2 w-full mt-auto">
                <h3 className={`text-sm font-black text-white uppercase tracking-tighter line-clamp-1`}>
                    {game.title}
                </h3>

                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <p className={`text-[10px] text-white/50 font-mono uppercase tracking-widest font-bold`}>
                        <span className="text-white">{playTimeHours}</span> HOURS PLAYED
                    </p>
                </div>
            </div>
        </div>
    );
}