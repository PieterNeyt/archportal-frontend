import { Avatar } from "@heroui/react";
import {Achievement} from "@/model/game.ts";

interface Props {
    achievement: Achievement;
}

export function AchievementItem({ achievement }: Props) {
    return (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
            <Avatar
                src={achievement.imageUrl}
                className="w-12 h-12 min-w-[3rem] border-2 border-white/10 group-hover:border-warning/50 transition-colors"
                radius="lg"
                fallback={<div className="animate-pulse bg-white/10 w-full h-full" />}
            />
            <div className="flex flex-col overflow-hidden">
                <h4 className="text-sm font-bold text-white truncate group-hover:text-warning transition-colors">
                    {achievement.title}
                </h4>
                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed">
                    {achievement.description}
                </p>
            </div>
        </div>
    );
}