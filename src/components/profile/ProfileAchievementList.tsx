import {Calendar, Trophy, AlertCircle, Lock} from "lucide-react"; // Lock toegevoegd
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {useProfileAchievements} from "@/hooks/useAchievement.ts";
import {formatTimeAgo} from "@/lib/dateUtils.ts";
import {Visibility, SectionType} from "@/model/profileSyncDto.ts";
import {VisibilityBadge} from "./VisibilityBadge.tsx";
import {Skeleton} from "@heroui/react";

interface ProfileAchievementListProps {
    profileId: string;
    visibility: Visibility;
    isOwner: boolean;
    isFriend: boolean;
}

export function ProfileAchievementList({profileId, visibility, isOwner, isFriend}: ProfileAchievementListProps) {
    const {isError, isLoading, achievements} = useProfileAchievements(profileId);

    const canSee =
        isOwner ||
        visibility === Visibility.PUBLIC ||
        (visibility === Visibility.FRIENDS && isFriend);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3 text-white/80">
                    <Trophy size={18} className="text-primary"/>
                    <h3 className="font-bold uppercase tracking-widest text-xs">Recent Achievements</h3>
                </div>

                {isOwner && (
                    <VisibilityBadge
                        section={{ type: SectionType.ACHIEVEMENTS, visibility }}
                        size="sm"
                    />
                )}
            </div>

            <div className={`${GLASS_CARD_STYLES} p-4 border-white/5`}>
                {!canSee ? (
                    <div className="py-8 text-center flex flex-col items-center gap-2">
                        <Lock size={20} className="text-white/20" />
                        <p className="text-xs text-white/30 uppercase tracking-widest font-medium">
                            Achievements are private
                        </p>
                    </div>
                ) : isLoading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <Skeleton className="w-8 h-8 rounded-lg bg-white/10 shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="w-1/2 h-3 rounded bg-white/10" />
                                    <Skeleton className="w-3/4 h-2 rounded bg-white/10" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center gap-2 text-center py-4">
                        <AlertCircle size={20} className="text-red-400/60" />
                        <p className="text-xs text-white/50 uppercase">Failed to load achievements</p>
                    </div>
                ) : achievements && achievements.length > 0 ? (
                    <div className="space-y-4">
                        {achievements.slice(0, 5).map((ach, index) => (
                            <div key={ach.id || index} className="flex items-start gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                    <Trophy size={16} className="text-primary"/>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-white/90 leading-none truncate">
                                        {ach.title}
                                    </p>
                                    <p className="text-[10px] text-white/40 mt-1 uppercase line-clamp-1">
                                        {ach.description}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-[9px] text-primary/60 font-mono">
                                        <Calendar size={10}/>
                                        {formatTimeAgo(ach.unlockedAt!)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center flex flex-col items-center gap-2">
                        <Trophy size={24} className="text-white/5" />
                        <p className="text-xs text-white/30 uppercase tracking-widest font-medium">
                            No achievements found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}