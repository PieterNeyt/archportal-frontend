import {useGameStatistics} from "@/hooks/useAnalytics.ts";
import {ChevronRight} from "lucide-react";
import {GlobalGameDto} from "@/model/library.ts";
import {Image} from "@heroui/image";

interface ProfileGameCardProps {
    game: GlobalGameDto;
}

export function ProfileGameCard({ game }: ProfileGameCardProps) {
    const { isError, isLoading, gameStatistics } = useGameStatistics(game.id);

    if (isLoading) return <div className="p-4 animate-pulse bg-white/5 rounded-xl h-20" />;
    if (isError || !gameStatistics) return null;

    const playTimeHours = (gameStatistics.totalPlayTimeMinutes / 60).toFixed(1);

    return (
        <div className="flex items-center justify-between p-3 w-full group">
            <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                    <Image
                        alt={game.title}
                        radius="none"
                        removeWrapper
                        className="w-full h-full object-cover"
                        src={game.imageUrl}
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-bold text-white uppercase tracking-tight truncate">
                        {game.title}
                    </p>
                    <p className="text-[10px] text-white/40 font-mono uppercase">
                        {playTimeHours} hours played
                    </p>
                </div>
            </div>
            <ChevronRight size={16} className="text-white/20 group-hover:text-primary transition-colors shrink-0 ml-2" />
        </div>
    );
}