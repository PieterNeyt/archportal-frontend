import {Avatar, Skeleton, Spinner} from "@heroui/react";
import {Calendar, Clock} from "lucide-react";
import {ProfileDto} from "@/model/profileSyncDto.ts";
import {usePlayerStats} from "@/hooks/useAnalytics.ts";
import {formatTimeAgo} from "@/lib/dateUtils.ts";

interface ProfileHeaderProps {
    profile: ProfileDto;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
    const { isLoading, isError, PlayerStats } = usePlayerStats(profile.id);

    // Beter: Gebruik Skeletons die de vorm van je content aannemen
    if (isLoading) {
        return (
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full animate-pulse">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-full" />
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-48 rounded-lg" />
                        <Skeleton className="h-4 w-32 rounded-lg" />
                    </div>
                </div>
                <div className="flex flex-col gap-6 border-l border-white/10 pl-8">
                    <Skeleton className="h-12 w-32 rounded-lg" />
                    <Skeleton className="h-12 w-32 rounded-lg" />
                </div>
            </div>
        );
    }

    // Beter: Een compacte error state die de layout niet breekt
    if (isError || !PlayerStats) {
        return (
            <div className="p-6 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-white/50">
                <AlertCircle className="mb-2 text-danger" />
                <p>Stats currently unavailable</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-stretch justify-between">
            {/* Linkerkant: Avatar en Naam */}
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <Avatar
                    src={profile.icon}
                    className="w-32 h-32 md:w-40 md:h-40 border-4 border-white/10 shadow-2xl"
                    isBordered
                    color="primary"
                />
                <div className="text-center md:text-left flex flex-col justify-center">
                    <h1 className="text-4xl font-black text-white tracking-tight uppercase">
                        {profile.gamerTag}
                    </h1>
                    <p className="text-white/60 font-medium mb-4 italic">
                        {profile.firstName} {profile.lastName}
                    </p>
                </div>
            </div>

            {/* Rechterkant: Statistieken */}
            <div className="flex flex-col justify-center gap-6 border-l border-white/10 pl-8 min-w-[200px]">
                <div>
                    <div className="flex items-center gap-2 text-primary mb-1">
                        <Clock size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Total Playtime</span>
                    </div>
                    <p className="text-3xl font-black text-white leading-none">
                        {PlayerStats.totalPlayTimeMinutes}
                        <span className="text-sm font-normal text-white/40 ml-1 font-mono uppercase">Min</span>
                    </p>
                </div>

                <div>
                    <div className="flex items-center gap-2 text-primary mb-1">
                        <Calendar size={14} />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">Last Played</span>
                    </div>
                    {/* Gebruik van de formatTimeAgo functie */}
                    <p className="text-lg font-semibold text-white/80">
                        {formatTimeAgo(PlayerStats.lastPlayed)}
                    </p>
                </div>
            </div>
        </div>
    );
}