import {Users} from "lucide-react";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import FriendCard from "@/components/friend/FriendCard.tsx";
import {Profile} from "@/model/profile.ts";

interface FriendsTabProps {
    isError: boolean;
    isLoading: boolean;
    filteredProfiles: Profile[];
}

export default function FriendsTab({isError, isLoading, filteredProfiles}: FriendsTabProps) {
    return (
        <>
            {isError && (
                <div className="text-center py-20">
                    <Users size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl">Oops! Something went wrong while loading your friends
                        list</p>
                </div>
            )}

            {isLoading && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {Array(10).fill(0).map((_, i) => (
                        <FriendSkeletonCard key={i}/>
                    ))}
                </div>
            )}

            {!isLoading && !isError && filteredProfiles.length === 0 && (
                <div className="text-center py-20">
                    <Users size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">
                        No friends found
                    </p>
                </div>
            )}

            {!isLoading && !isError && filteredProfiles.length > 0 && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {filteredProfiles.map((profile) => (
                        <FriendCard
                            key={profile.gamerTag}
                            gamerTag={profile.gamerTag}
                            icon={profile.icon}
                            activeUsernameColorId={profile.activeUsernameColorId}
                        />
                    ))}
                </div>
            )}
        </>
    );
}