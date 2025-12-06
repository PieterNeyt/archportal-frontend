import {Clock, UserPlus} from "lucide-react";
import {useGetIncomingFriendRequests, useGetOutgoingFriendRequests} from "@/hooks/useFriends.ts";
import RequestSection from "@/components/friend/RequestSection.tsx";

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

    return (
        <>
            <RequestSection title={"Incoming requests"}
                            icon={<UserPlus className={"text-purple-400"}/>}
                            emptyIcon={<UserPlus size={64} className="text-white/40 mx-auto mb-4"/>}
                            isLoading={isLoadingIncoming}
                            isError={isErrorIncoming} profiles={filteredIncoming} type={"incoming"}/>

            <RequestSection title={"Outgoing requests"}
                            icon={<Clock className={"text-purple-400"}/>}
                            emptyIcon={<Clock size={64} className="text-white/40 mx-auto mb-4"/>}
                            isLoading={isLoadingOutgoing}
                            isError={isErrorOutgoing} profiles={filteredOutgoing} type={"outgoing"}/>
        </>
    );
}