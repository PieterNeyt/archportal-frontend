import {Profile} from "@/model/profile.ts";
import {UserPlus} from "lucide-react";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import RequestCard from "@/components/friend/RequestCard.tsx";

interface RequestsTabProps {
    isLoading: boolean
    isError: boolean
    filteredProfiles: Profile[]
}

export default function RequestsTab({isLoading, isError, filteredProfiles}: RequestsTabProps) {
    return (
        <>
            {isError && (
                <div className="text-center py-20">
                    <UserPlus size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl">Oops! Something went wrong while loading your friend requests
                    </p>
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
                    <UserPlus size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">
                        No friend requests found
                    </p>
                </div>
            )}

            {!isLoading && !isError && filteredProfiles.length > 0 && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {filteredProfiles.map((profile, i) => (
                        <RequestCard key={i} {...profile}/>
                    ))}
                </div>
            )}
        </>
    );
}