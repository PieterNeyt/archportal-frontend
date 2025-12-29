import {Calendar, Trophy} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {useProfileAchievements} from "@/hooks/useAchievement.ts";
import {formatTimeAgo} from "@/lib/dateUtils.ts";


interface ProfileAchievementListProps {
    profileId: string;
}

export function ProfileAchievementList({profileId}: ProfileAchievementListProps) {
    const {isError, isLoading, achievements} = useProfileAchievements(profileId);
    if (isLoading) return null;
    if (isError || !achievements) return null;

    return <>
        <div className="flex items-center gap-3 text-white/80 px-1">
            <Trophy size={18} className="text-primary"/>
            <h3 className="font-bold uppercase tracking-widest text-xs">Recent Milestones</h3>
        </div>
        <div className={`${GLASS_CARD_STYLES} p-4 space-y-4 border-white/5`}>
            {achievements.map(ach => (
                <div key={ach.id} className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Trophy size={16} className="text-primary"/>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white/90 leading-none">{ach.title}</p>
                        <p className="text-[10px] text-white/40 mt-1 uppercase">{ach.description}</p>
                        <div className="flex items-center gap-1 mt-2 text-[9px] text-primary/60 font-mono">
                            <Calendar size={10}/>
                            {formatTimeAgo(ach.unlockedAt!)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>
}