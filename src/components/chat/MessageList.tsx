import {useEffect, useRef} from "react";
import MessageCard from "@/components/chat/MessageCard.tsx";
import {useGetChatRoom} from "@/hooks/useChatRooms.ts";
import MessageSkeletonCard from "@/components/chat/MessageSkeletonCard.tsx";
import MessageError from "@/components/chat/MessageError.tsx";
import {MessageCircle} from "lucide-react";

interface MessageListProps {
    id: string;
}

const SKELETON_COUNT = 5;

export default function MessageList({id}: MessageListProps) {
    const {isLoading, isError, chatRoom, refetch} = useGetChatRoom(id);
    const messagesEndRef = useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "instant"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [chatRoom]);

    if (isError) {
        return <MessageError onRetry={() => refetch()}/>
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading && (Array(SKELETON_COUNT).fill(0).map((_, i) => (
                    <MessageSkeletonCard key={i}/>
                ))
            )}

            {!isLoading && chatRoom && chatRoom.messages.length === 0 && (
                <div className="text-center py-20">
                    <MessageCircle size={64} className="text-white/40 mx-auto mb-4"/>
                    <p className="text-white/60 text-xl mb-2">
                        No messages found
                    </p>
                </div>
            )}

            {!isLoading && chatRoom && chatRoom.messages.length > 0 && chatRoom.messages.map((message, index) => (
                <MessageCard key={index} text={message.text} timestamp={message.timestamp}
                             isYours={message.isYou}/>
            ))}

            <div ref={messagesEndRef}/>
        </div>
    );
}