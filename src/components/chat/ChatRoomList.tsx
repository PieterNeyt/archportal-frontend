import {ChatRoom} from "@/model/chatRoom.ts";
import ChatRoomCard from "@/components/chat/ChatRoomCard.tsx";
import ChatRoomSkeletonCard from "@/components/chat/ChatRoomSkeletonCard.tsx";
import {Users} from "lucide-react";

interface ChatRoomListProps {
    chatRooms: ChatRoom[] | undefined;
    setChatRoom: (chatRoom: ChatRoom) => void;
    isLoading: boolean;
}

const SKELETON_COUNT = 5;

export default function ChatRoomList({chatRooms, setChatRoom, isLoading}: ChatRoomListProps) {

    return (
        <div className={"flex flex-col divide-y"}>

            {isLoading && (
                Array(SKELETON_COUNT).fill(0).map((_, i) => (
                    <div key={i} className={"py-2"}>
                        <ChatRoomSkeletonCard/>
                    </div>
                ))
            )}

            {!isLoading && chatRooms && chatRooms.length === 0 && (
                <div className="text-center py-20">
                    <Users size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">No chats found</p>
                </div>
            )}

            {!isLoading && chatRooms && chatRooms.length > 0 && chatRooms.map((chatRoom: ChatRoom, index: number) => (
                <div key={index} className={"py-2"}>
                    <ChatRoomCard title={chatRoom.title} onClick={() => setChatRoom(chatRoom)}/>
                </div>
            ))}
        </div>
    );
}