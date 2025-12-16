import PartyCard from "@/components/party/PartyCard.tsx";
import PartyMember from "@/components/party/PartyMember.tsx";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";

const DUMMY_MEMBERS = [
    {
        id: "1",
        gamerTag: "ShadowViper",
        icon: "https://i.pravatar.cc/150?u=1",
        isLeader: true,
        isReady: true,
        level: 42
    },
    {
        id: "2",
        gamerTag: "NeonGhost",
        icon: "https://i.pravatar.cc/150?u=2",
        isLeader: false,
        isReady: true,
        level: 15
    },
    {
        id: "3",
        gamerTag: "PixelWarrior",
        icon: "https://i.pravatar.cc/150?u=3",
        isLeader: false,
        isReady: false,
        level: 8
    }
];

export default function PartyPage() {
    return (
        <div
            className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 flex flex-col items-center justify-center min-h-screen  p-4"
        >
            {/*<CreatePartyCard/>*/}
            {/*<div>*/}
            {/*    joinable party list*/}
            {/*</div>*/}
            <PartyCard max={8} count={DUMMY_MEMBERS.length}/>
            <div className={`flex flex-col gap-2 w-full ${GLASS_CARD_STYLES} p-4`}>
                {DUMMY_MEMBERS.map((member, index) => (
                    <PartyMember key={index} icon={member.icon} gamerTag={member.gamerTag} isLeader={member.isLeader}
                                 isReady={member.isReady}/>
                ))}
            </div>
            <div className={`w-full flex-1 flex-col p-4 relative ${GLASS_CARD_STYLES}`}>
                <h2 className="text-lg font-semibold mb-4 text-white px-2 border-b border-white/10 pb-2">
                    Party chat
                </h2>
                <div className="flex-1 overflow-hidden flex flex-col mb-4">
                    {/*<MessageList id={selectedChatRoom.id} />*/}
                </div>

                <div className="mt-auto">
                    {/*<MessageInput chatId={selectedChatRoom.id} />*/}
                </div>
            </div>
        </div>
    );
}
