import PartyCard from "@/components/party/PartyCard.tsx";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import MessageList from "@/components/chat/MessageList.tsx";
import MessageInput from "@/components/chat/MessageInput.tsx";
import {Divider} from "@heroui/react";
import PartyMember from "@/components/party/PartyMember.tsx";
import {useGetPartyMembers} from "@/hooks/useParties.ts";
import {AlertCircle, RefreshCcw} from "lucide-react";
import {Button} from "@heroui/button";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import {useContext} from "react";
import securityContext from "@/context/SecurityContext.ts";

const SKELETON_COUNT = 3;

interface InPartyProps {
    title: string;
    maxMembers: number;
    chatRoomId: string;
}

export default function InParty({title, maxMembers, chatRoomId}: InPartyProps) {
    const {
        members,
        isError,
        isLoading,
        refetch
    } = useGetPartyMembers();

    const {loggedInUser} = useContext(securityContext);
    const leader = (members?.filter(m => m.isLeader) || [])[0]

    return (
        <div className="h-screen max-w-7xl mx-auto flex flex-col p-4 sm:p-6 lg:p-8 gap-6">

            <PartyCard title={title} max={maxMembers} count={members?.length ?? 0}/>

            <div className={`flex-1 flex flex-col lg:flex-row gap-6 min-h-0 ${GLASS_CARD_STYLES}`}>
                <div className={`flex-1 flex flex-col p-4 relative`}>
                    <h2 className="text-lg font-semibold p-4 text-white border-b border-white/10">
                        Party chat
                    </h2>

                    <div className="flex-1 overflow-y-auto p-4">
                        <MessageList id={chatRoomId}/>
                    </div>

                    <div className="p-4 border-t border-white/10">
                        <MessageInput chatId={chatRoomId}/>
                    </div>
                </div>

                <Divider orientation={"vertical"} className={"bg-white/10 w-1"}/>

                <div className={`flex-1 flex flex-col p-4 relative lg:max-w-xs`}>
                    <h2 className="text-lg font-semibold uppercase tracking-wider text-gray-400 p-4 border-b border-white/10">
                        Members - {members?.length ?? 0}
                    </h2>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {isLoading && (
                            Array(SKELETON_COUNT).fill(0).map((_, index) => (
                                <FriendSkeletonCard key={index}/>
                            ))
                        )}

                        {(isError || !members || members?.length === 0) && (
                            <div className="flex flex-col items-center justify-center h-64 p-4 text-center gap-3">
                                <AlertCircle className="text-danger" size={32}/>
                                <p className="text-sm text-white/50">Failed to sync members</p>
                                <Button
                                    size="sm"
                                    variant="flat"
                                    onPress={() => refetch()}
                                    startContent={<RefreshCcw size={14}/>}
                                >
                                    Retry
                                </Button>
                            </div>
                        )}

                        {!isLoading && !isError && members && members.map((member, index) => (
                            <PartyMember
                                key={index}
                                icon={member.icon}
                                gamerTag={member.gamerTag}
                                isLeader={member.isLeader}
                                isReady={member.isReady}
                                canKick={loggedInUser?.gamerTag == leader.gamerTag}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}