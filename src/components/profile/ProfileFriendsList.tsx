import {Users} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {Avatar} from "@heroui/react";
import {useProfileFriends} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";


interface ProfileFriendsListProps {
    profileId: string;
}

export function ProfileFriendsList({profileId}: ProfileFriendsListProps) {
    const {isLoading,isError,friends} = useProfileFriends(profileId);

    if (isLoading) {
        return <CircularProgress />;
    }

    if(isError || !friends) {
        return <div>Error</div>;
    }

    return <>
        <div className="flex items-center gap-3 text-white/80 px-1">
            <Users size={18} className="text-primary"/>
            <h3 className="font-bold uppercase tracking-widest text-xs">Friends Online</h3>
        </div>
        <div className={`${GLASS_CARD_STYLES} p-4 space-y-3 border-white/5`}>
            {friends.map(friend => (
                <div key={friend.gamerTag}
                     className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors cursor-pointer">
                        <Avatar src={friend.icon} size="sm" radius="md"/>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white/90">{friend.firstName}</span>
                        <span className="text-[10px] text-white/30 uppercase">{friend.lastName}</span>
                    </div>
                </div>
            ))}
        </div>
    </>
}