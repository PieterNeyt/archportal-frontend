import {ChatRoom} from "@/model/chatRoom.ts";
import ChatRoomCard from "@/components/chat/ChatRoomCard.tsx";
import ChatRoomSkeletonCard from "@/components/chat/ChatRoomSkeletonCard.tsx";
import {Users} from "lucide-react";

interface ChatRoomListProps {
    chatRooms: ChatRoom[] | undefined;
    setChatRoom: (chatRoom: ChatRoom) => void;
    isLoading: boolean;
    selectedId?: string;
}

const SKELETON_COUNT = 5;

export default function ChatRoomList({chatRooms, setChatRoom, isLoading, selectedId}: ChatRoomListProps) {

    return (
        <div className="flex flex-col gap-1">

            {/* Loading State */}
            {isLoading && (
                Array(SKELETON_COUNT).fill(0).map((_, i) => (
                    <ChatRoomSkeletonCard key={i}/>
                ))
            )}

            {/* Empty State */}
            {!isLoading && chatRooms && chatRooms.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-white/5 p-4 rounded-full mb-4">
                        <Users size={32} className="text-white/40"/>
                    </div>
                    <p className="text-white/60 text-lg font-medium">No chats found</p>
                    <p className="text-white/30 text-sm">Join a room to start chatting</p>
                </div>
            )}

            {/* List */}
            {!isLoading && chatRooms && chatRooms.length > 0 && chatRooms.map((chatRoom) => {
                return (<ChatRoomCard
                    key={chatRoom.id}
                    title={chatRoom.title}
                    chatroomId={chatRoom.id}
                    onClick={() => setChatRoom(chatRoom)}
                    isActive={selectedId === chatRoom.id}
                />)
            })}
        </div>
    );
}