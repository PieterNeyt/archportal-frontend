import PartyCard from "@/components/party/PartyCard.tsx";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import MessageList from "@/components/chat/MessageList.tsx";
import MessageInput from "@/components/chat/MessageInput.tsx";
import {Divider} from "@heroui/react";
import PartyMember from "@/components/party/PartyMember.tsx";
import {Member} from "@/model/party.ts";

interface InPartyProps {
    title: string;
    maxMembers: number;
    members: Member[];
    chatRoomId: string;
}

export default function InParty({title, maxMembers, members, chatRoomId}: InPartyProps) {
    return (
        <div className="h-screen max-w-7xl mx-auto flex flex-col p-4 sm:p-6 lg:p-8 gap-6">

            <PartyCard title={title} max={maxMembers} count={members.length}/>

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
                        Members - {members.length}
                    </h2>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {members.map((member, index) => (
                            <PartyMember
                                key={index}
                                icon={member.icon}
                                gamerTag={member.gamerTag}
                                isLeader={member.isLeader}
                                isReady={member.isReady}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}