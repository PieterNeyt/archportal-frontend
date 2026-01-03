import {Avatar, Skeleton} from "@heroui/react";
import {Calendar, Clock, AlertCircle, ShieldCheck} from "lucide-react";
import {ProfileDto, Visibility, SectionType} from "@/model/profileSyncDto.ts";
import {usePlayerStats} from "@/hooks/useAnalytics.ts";
import {formatTimeAgo} from "@/lib/dateUtils.ts";
import {VisibilityBadge} from "./VisibilityBadge.tsx";
import {useActiveUsernameColorFromProfileId} from "@/hooks/useBenefits.ts";

interface ProfileHeaderProps {
    profile: ProfileDto;
    visibility: Visibility;
    isOwner: boolean;
    isFriend: boolean;
}

export function ProfileHeader({profile, visibility, isOwner, isFriend}: ProfileHeaderProps) {
    const {isLoading, isError, PlayerStats} = usePlayerStats(profile.id);
    const {profileColor} = useActiveUsernameColorFromProfileId(profile.id);

    const canSeeStats =
        isOwner ||
        visibility === Visibility.PUBLIC ||
        (visibility === Visibility.FRIENDS && isFriend);

    if (isLoading) {
        return (
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10"/>
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-48 rounded-lg bg-white/10"/>
                        <Skeleton className="h-4 w-32 rounded-lg bg-white/10"/>
                    </div>
                </div>
                <div className="flex flex-col gap-6 md:border-l border-white/10 md:pl-8 w-full md:w-auto">
                    <Skeleton className="h-12 w-40 rounded-lg bg-white/10"/>
                    <Skeleton className="h-12 w-40 rounded-lg bg-white/10"/>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-between">
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative">
                    <Avatar
                        src={profile.icon}
                        className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/10 shadow-2xl"
                        isBordered
                        color="primary"
                    />
                </div>
                <div className="text-center md:text-left flex flex-col justify-center">
                    <h1
                        className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase"
                        style={profileColor ? { color: profileColor } : undefined}
                    >
                        {profile.gamerTag}
                    </h1>
                    <p className="text-white/60 font-medium italic">
                        {profile.firstName} {profile.lastName}
                    </p>
                </div>
            </div>

            {canSeeStats ? (
                <div className="flex flex-col justify-center gap-6 md:border-l border-white/10 md:pl-10 min-w-[240px]">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">
                            Player Statistics
                        </span>
                        {isOwner && (
                            <VisibilityBadge
                                section={{type: SectionType.STATISTICS, visibility}}
                                size="sm"
                            />
                        )}
                    </div>

                    {isError || !PlayerStats ? (
                        <div className="flex items-center gap-2 text-red-500/50">
                            <AlertCircle size={16}/>
                            <span className="text-[10px] uppercase font-bold">Stats unavailable</span>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Clock size={14}/>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Total Playtime</span>
                                </div>
                                <p className="text-4xl font-black text-white leading-none">
                                    {((PlayerStats.totalPlayTimeMinutes || 0) / 60).toFixed(2)}
                                    <span className="text-sm font-normal text-white/40 ml-2 font-mono uppercase tracking-tighter">
                                        Hours
                                    </span>
                                </p>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 text-primary mb-1">
                                    <Calendar size={14}/>
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Last Activity</span>
                                </div>
                                <p className="text-lg font-bold text-white/80 uppercase tracking-tight">
                                    {formatTimeAgo(PlayerStats.lastPlayed)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center md:border-l border-white/5 md:pl-10 text-white/10 italic">
                    <ShieldCheck size={24} className="mb-2 opacity-20" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Statistics Private</span>
                </div>
            )}
        </div>
    );
}