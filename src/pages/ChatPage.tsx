import {useGetChatRooms} from "@/hooks/useChatRooms.ts";
import ChatRoomsError from "@/components/chat/ChatRoomsError.tsx";
import ChatRoomList from "@/components/chat/ChatRoomList.tsx";
import {useState} from "react";
import {ChatRoom} from "@/model/chatRoom.ts";
import MessageList from "@/components/chat/MessageList.tsx";
import MessageInput from "@/components/chat/MessageInput.tsx";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {MessageSquareDashed} from "lucide-react";

export default function ChatPage() {
    const {isLoading, isError, chatRooms, refetch} = useGetChatRooms();
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);

    if (isError) {
        return (
            <div className="flex h-screen p-6 items-center justify-center">
                <div className={`${GLASS_CARD_STYLES} p-8`}>
                    <ChatRoomsError onRetry={() => refetch()}/>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen p-6 gap-6 overflow-hidden">

            {/* Sidebar Card */}
            <aside className={`${GLASS_CARD_STYLES} w-80 flex flex-col p-4`}>
                <h2 className="text-lg font-semibold mb-4 text-white px-2">Chats</h2>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <ChatRoomList
                        chatRooms={chatRooms}
                        setChatRoom={setSelectedChatRoom}
                        isLoading={isLoading}
                        selectedId={selectedChatRoom?.id}
                    />
                </div>
            </aside>

            {/* Main Chat Card */}
            <main className={`${GLASS_CARD_STYLES} flex-1 flex flex-col p-4 relative`}>
                {selectedChatRoom ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4 text-white px-2 border-b border-white/10 pb-2">
                            {selectedChatRoom.title}
                        </h2>
                        <div className="flex-1 overflow-hidden flex flex-col mb-4">
                            <MessageList id={selectedChatRoom.id} />
                        </div>

                        <div className="mt-auto">
                            <MessageInput chatId={selectedChatRoom.id} />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-white/30 select-none gap-6">
                        <MessageSquareDashed size={80} strokeWidth={1}/>
                        <div className="text-center">
                            <p className="text-2xl font-medium text-white/50">No chat selected</p>
                            <p className="text-sm mt-2 opacity-60">Choose a conversation to start talking</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}