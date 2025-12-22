import {Game} from "@/model/game.ts";
import {useAchievemnts} from "@/hooks/useAchievement.ts";
import {AchievementItem} from "@/components/game/AchievementItem.tsx";
import {AchievementsTabContentSkeleton} from "@/components/library/game/achievement/AchievementsTabContentSkeleton.tsx";

interface AchievementsTabContentProps {
    game: Game;
}

export function AchievementsTabContent({ game }: AchievementsTabContentProps) {
    const { isLoading, isError, achievements } = useAchievemnts(game.id);

    if (isLoading)
        return <AchievementsTabContentSkeleton/>

    if (isError || !achievements) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-danger/20 rounded-xl bg-danger/5">
                <p className="text-danger-400 font-medium">Failed to load achievements.</p>
            </div>
        );
    }

    if (achievements.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-white/10 rounded-xl bg-white/5">
                <p className="text-white/40 font-medium text-sm">No achievements discovered yet.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[500px]">
            {achievements.map((achievement, index) => (
                <AchievementItem key={achievement.id || index} achievement={achievement} />
            ))}
        </div>
    );
}