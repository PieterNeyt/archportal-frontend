import {useGetChatRooms, useSendMessage} from "@/hooks/useChatRooms.ts";
import ChatRoomsError from "@/components/chat/ChatRoomsError.tsx";
import ChatRoomList from "@/components/chat/ChatRoomList.tsx";
import {useState} from "react";
import {ChatRoom} from "@/model/chatRoom.ts";
import MessageList from "@/components/chat/MessageList.tsx";
import MessageInput from "@/components/chat/MessageInput.tsx";
import {sendMessageSchema} from "@/validation/sendMessage.ts";
import useToastEffect from "@/hooks/useToastEffect.ts";


export default function ChatPage() {
    const {isLoading, isError, chatRooms, refetch} = useGetChatRooms();
    const [selectedChatRoom, setSelectedChatRoom] = useState<ChatRoom | null>(null);
    const sendAction = useSendMessage();
    const {sendMessage, isPending: isSending} = sendAction;

    // show toasts for send success/failure
    useToastEffect(sendAction, "Message sent", "Failed to send message", "Your message was sent successfully.");

    if (isError) {
        return <ChatRoomsError onRetry={() => refetch()}/>;
    }

    return (
        <div className={"flex h-screen"}>
            <aside className={"w-80 border-r overflow-y-auto p-4"}>
                <h2 className={"text-lg font-semibold mb-4"}>Chats</h2>
                <ChatRoomList chatRooms={chatRooms} setChatRoom={setSelectedChatRoom}
                              isLoading={isLoading}
                />
            </aside>
            <main className={"flex-1 flex flex-col p-4"}>
                <h2 className={"text-lg font-semibold mb-4"}>{selectedChatRoom?.title ?? "Select a chat"}</h2>
                <div className={"flex-1 overflow-y-auto border rounded-md p-4 bg-base-100 flex flex-col"}>
                    {selectedChatRoom ? (
                        <MessageList id={selectedChatRoom.id}/>
                    ) : (
                        <div className={"text-sm text-muted"}>No chat selected</div>
                    )}
                </div>

                <div className={"mt-4"}>
                    {selectedChatRoom && (
                        <MessageInput
                            isSending={isSending}
                            onSend={(text: string) => {
                                const parsed = sendMessageSchema.safeParse({id: selectedChatRoom.id, text});
                                if (!parsed.success) {
                                    return;
                                }
                                return sendMessage(parsed.data);
                            }}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}