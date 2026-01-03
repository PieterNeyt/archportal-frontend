import {AlertCircle, Users, Lock} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {Skeleton} from "@heroui/react";
import {useProfileFriends} from "@/hooks/useFriends.ts";
import {SectionType, Visibility} from "@/model/profileSyncDto.ts";
import {VisibilityBadge} from "./VisibilityBadge.tsx";
import {ProfileFriendItem} from "@/components/profile/ProfileFriendItem.tsx";

interface ProfileFriendsListProps {
    profileId: string;
    visibility: Visibility;
    isOwner: boolean;
    isFriend: boolean;
}

export function ProfileFriendsList({profileId, visibility, isOwner, isFriend}: ProfileFriendsListProps) {
    const {isLoading, isError, friends} = useProfileFriends(profileId);

    const hasAccess =
        isOwner ||
        visibility === Visibility.PUBLIC ||
        (visibility === Visibility.FRIENDS && isFriend);

    if (!hasAccess) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1 text-white/40">
                    <Users size={18}/>
                    <h3 className="font-bold uppercase tracking-widest text-xs">Friends</h3>
                </div>
                <div className={`${GLASS_CARD_STYLES} p-8 border-white/5 flex flex-col items-center gap-2 text-center`}>
                    <Lock size={20} className="text-white/20"/>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-medium">
                        This list is private
                    </p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-3 px-1">
                    <Skeleton className="w-4 h-4 rounded bg-white/10"/>
                    <Skeleton className="w-32 h-3 rounded bg-white/10"/>
                </div>
                <div className={`${GLASS_CARD_STYLES} p-4 space-y-4 border-white/5`}>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-md bg-white/10 shrink-0"/>
                            <div className="flex-1 space-y-2">
                                <Skeleton className="w-1/2 h-3 rounded bg-white/10"/>
                                <Skeleton className="w-1/4 h-2 rounded bg-white/10"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={`${GLASS_CARD_STYLES} p-6 border-red-500/20 flex flex-col items-center gap-2 text-center`}>
                <AlertCircle size={20} className="text-red-400/60"/>
                <p className="text-xs text-white/50 uppercase tracking-widest">Failed to load friends</p>
            </div>
        );
    }

    const displayFriends = friends?.slice(0, 5) || [];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3 text-white/80">
                    <Users size={18} className="text-primary"/>
                    <h3 className="font-bold uppercase tracking-widest text-xs">Friends</h3>
                </div>

                {isOwner && (
                    <VisibilityBadge
                        section={{type: SectionType.FRIENDS, visibility}}
                        size="sm"
                    />
                )}
            </div>

            <div className={`${GLASS_CARD_STYLES} p-4 border-white/5`}>
                {displayFriends.length > 0 ? (
                    <div className="space-y-3">
                        {displayFriends.map((friend, i) => (
                            <ProfileFriendItem key={friend.id || i} profile={friend}/>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center flex flex-col items-center gap-2">
                        <Users size={24} className="text-white/5"/>
                        <p className="text-xs text-white/30 uppercase tracking-widest font-medium">
                            No friends found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}