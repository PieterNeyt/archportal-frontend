import {Avatar, Skeleton} from "@heroui/react";
import {Calendar, Clock, AlertCircle} from "lucide-react";
import {ProfileDto, Visibility, SectionType} from "@/model/profileSyncDto.ts";
import {usePlayerStats} from "@/hooks/useAnalytics.ts";
import {formatTimeAgo} from "@/lib/dateUtils.ts";
import {VisibilityBadge} from "./VisibilityBadge.tsx";

interface ProfileHeaderProps {
    profile: ProfileDto;
    visibility: Visibility;
    isOwner: boolean;
}

export function ProfileHeader({ profile, visibility, isOwner }: ProfileHeaderProps) {
    const { isLoading, isError, PlayerStats } = usePlayerStats(profile.id);

    // --- LOADING STATE (SKELETON) ---
    if (isLoading) {
        return (
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10" />
                    <div className="space-y-3">
                        <Skeleton className="h-10 w-48 rounded-lg bg-white/10" />
                        <Skeleton className="h-4 w-32 rounded-lg bg-white/10" />
                    </div>
                </div>
                <div className="flex flex-col gap-6 md:border-l border-white/10 md:pl-8 w-full md:w-auto">
                    <Skeleton className="h-12 w-40 rounded-lg bg-white/10" />
                    <Skeleton className="h-12 w-40 rounded-lg bg-white/10" />
                </div>
            </div>
        );
    }

    // --- ERROR STATE ---
    if (isError || !PlayerStats) {
        return (
            <div className="p-8 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-center gap-3">
                <AlertCircle size={24} className="text-red-500/50" />
                <div>
                    <p className="text-white font-bold uppercase tracking-widest text-xs">Stats unavailable</p>
                    <p className="text-white/30 text-[10px] mt-1">We couldn't retrieve the player statistics at this time.</p>
                </div>
            </div>
        );
    }

    // Converting minutes to hours for a cleaner look if desired,
    // but staying with your logic of showing raw minutes + "Min" label.
    const playTime = PlayerStats.totalPlayTimeMinutes;

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-between">
            {/* Left Side: Avatar and Name */}
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
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                        {profile.gamerTag}
                    </h1>
                    <p className="text-white/60 font-medium italic">
                        {profile.firstName} {profile.lastName}
                    </p>
                </div>
            </div>

            {/* Right Side: Statistics */}
            <div className="flex flex-col justify-center gap-6 md:border-l border-white/10 md:pl-10 min-w-[240px]">
                {/* Statistics Header with Visibility Badge */}
                <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/30">Player Statistics</span>
                    {isOwner && (
                        <VisibilityBadge
                            section={{ type: SectionType.STATISTICS, visibility }}
                            size="sm"
                        />
                    )}
                </div>

                <div className="space-y-6">
                    {/* Playtime */}
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Clock size={14} />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Total Playtime</span>
                        </div>
                        <p className="text-4xl font-black text-white leading-none">
                            {playTime/60}
                            <span className="text-sm font-normal text-white/40 ml-2 font-mono uppercase tracking-tighter">Hours</span>
                        </p>
                    </div>

                    {/* Last Played */}
                    <div>
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Calendar size={14} />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Last Activity</span>
                        </div>
                        <p className="text-lg font-bold text-white/80 uppercase tracking-tight">
                            {formatTimeAgo(PlayerStats.lastPlayed)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}