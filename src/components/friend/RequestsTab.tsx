import {Clock, UserPlus} from "lucide-react";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import RequestCard from "@/components/friend/RequestCard.tsx";
import {useGetIncomingFriendRequests, useGetOutgoingFriendRequests} from "@/hooks/useFriends.ts";

interface RequestsTabProps {
    searchQuery: string;
}

export default function RequestsTab({searchQuery}: RequestsTabProps) {
    const {
        isLoading: isLoadingIncoming,
        isError: isErrorIncoming,
        profiles: requestIncoming
    } = useGetIncomingFriendRequests();
    const {
        isLoading: isLoadingOutgoing,
        isError: isErrorOutgoing,
        profiles: requestOutgoing
    } = useGetOutgoingFriendRequests();

    const filteredIncoming = requestIncoming?.filter(profile =>
        profile.gamerTag.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const filteredOutgoing = requestOutgoing?.filter(profile =>
        profile.gamerTag.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
    // TODO dit goed opsplitsen tussen incoming en outgoing requests
    return (
        <>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <UserPlus className=" text-purple-400"/>
                Incoming requests
            </h3>
            {isErrorIncoming && (
                <div className="text-center py-20">
                    <UserPlus size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl">Oops! Something went wrong while loading your friend requests
                    </p>
                </div>
            )}

            {isLoadingIncoming && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {Array(10).fill(0).map((_, i) => (
                        <FriendSkeletonCard key={i}/>
                    ))}
                </div>
            )}

            {!isLoadingIncoming && !isErrorIncoming && filteredIncoming.length === 0 && (
                <div className="text-center py-20">
                    <UserPlus size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">
                        No friend requests found
                    </p>
                </div>
            )}

            {!isLoadingIncoming && !isErrorIncoming && filteredIncoming.length > 0 && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {filteredIncoming.map((profile, i) => (
                        <RequestCard key={i} {...profile}/>
                    ))}
                </div>
            )}

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="text-yellow-400"/>
                Outgoing requests
            </h3>

            {isErrorOutgoing && (
                <div className="text-center py-20">
                    <Clock size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl">Oops! Something went wrong while loading your friend requests
                    </p>
                </div>
            )}

            {isLoadingOutgoing && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {Array(10).fill(0).map((_, i) => (
                        <FriendSkeletonCard key={i}/>
                    ))}
                </div>
            )}

            {!isLoadingOutgoing && !isErrorIncoming && filteredOutgoing.length === 0 && (
                <div className="text-center py-20">
                    <Clock size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">
                        No friend requests found
                    </p>
                </div>
            )}

            {!isLoadingOutgoing && !isErrorOutgoing && filteredOutgoing.length > 0 && (
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"}>
                    {filteredOutgoing.map((profile, i) => (
                        <RequestCard key={i} {...profile}/>
                    ))}
                </div>
            )}
        </>
    );
}