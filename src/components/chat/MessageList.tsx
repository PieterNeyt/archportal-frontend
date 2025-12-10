import { useEffect, useRef } from "react";
import MessageCard from "@/components/chat/MessageCard.tsx";
import { useGetChatRoom } from "@/hooks/useChatRooms.ts";
import MessageSkeletonCard from "@/components/chat/MessageSkeletonCard.tsx";
import MessageError from "@/components/chat/MessageError.tsx";
import { MessageCircle } from "lucide-react";
import { ScrollShadow } from "@heroui/react";

interface MessageListProps {
    id: string;
}

const SKELETON_COUNT = 5;

export default function MessageList({ id }: MessageListProps) {
    const { isLoading, isError, chatRoom, refetch } = useGetChatRoom(id);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatRoom]);

    if (isError) {
        return <MessageError onRetry={() => refetch()} />;
    }

    const isEmpty = !isLoading && chatRoom && chatRoom.messages.length === 0;

    return (
        <ScrollShadow
            className="flex-1 p-4 space-y-4 h-full"
            size={40}
        >
            {isLoading &&
                Array(SKELETON_COUNT)
                    .fill(0)
                    .map((_, i) => <MessageSkeletonCard key={i} />)}

            {/* Empty State */}
            {isEmpty && (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-60">
                    <div className="p-4 bg-white/5 rounded-full ring-1 ring-white/10">
                        <MessageCircle size={48} className="text-white/80" />
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="text-xl font-semibold text-white">
                            No messages yet
                        </h3>
                        <p className="text-sm text-white/50 max-w-xs">
                            Start the conversation by typing a message below.
                        </p>
                    </div>
                </div>
            )}

            {/* Messages List */}
            {!isLoading &&
                chatRoom &&
                chatRoom.messages.length > 0 &&
                chatRoom.messages.map((message, index) => (
                    <MessageCard
                        key={index}
                        text={message.text}
                        timestamp={message.timestamp}
                        isYours={message.isYou}
                    />
                ))}

            <div ref={messagesEndRef} />
        </ScrollShadow>
    );
}