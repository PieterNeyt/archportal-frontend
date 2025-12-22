import { Avatar } from "@heroui/react";
import { Achievement } from "@/model/game.ts";

interface Props {
    achievement: Achievement;
}

export function AchievementItem({ achievement }: Props) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-warning/30 transition-all duration-300 group shadow-sm">
            <div className="relative">
                <Avatar
                    src={achievement.imageUrl}
                    className="w-14 h-14 min-w-[3.5rem] border-2 border-white/10 group-hover:border-warning/50 transition-colors"
                    radius="lg"
                    fallback={
                        <div className="bg-white/10 w-full h-full flex items-center justify-center text-xs text-white/20">
                            ?
                        </div>
                    }
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full border-2 border-[#121212] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col overflow-hidden flex-1">
                <h4 className="text-sm font-bold text-white truncate group-hover:text-warning transition-colors">
                    {achievement.title}
                </h4>
                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mt-0.5">
                    {achievement.description}
                </p>
            </div>

            {achievement.unlockedAt && (
                <div className="text-right shrink-0">
                    <p className="text-[10px] uppercase tracking-wider text-warning/60 font-bold">
                        Unlocked
                    </p>
                    <p className="text-xs text-white/40">
                        {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </p>
                </div>
            )}
        </div>

    );
}