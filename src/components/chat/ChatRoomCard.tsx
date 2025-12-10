import { Users } from "lucide-react";
import { useGetChatRoomLastMessage } from "@/hooks/useChatRooms.ts";
import {formatTimeAgo} from "@/lib/dateUtils.ts";

interface ChatRoomCardProps {
    title: string;
    chatroomId: string;
    onClick: () => void;
    isActive?: boolean;
}

export default function ChatRoomCard({ title, chatroomId, onClick, isActive }: ChatRoomCardProps) {
    const { isLoading, isError, lastMessage } = useGetChatRoomLastMessage(chatroomId);

    return (
        <div
            onClick={onClick}
            className={`
                group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300
                border border-transparent
                ${isActive
                ? "bg-white/10 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                : "hover:bg-white/5 hover:border-white/5"
            }
            `}
        >
            {/* Avatar Icon */}
            <div className={`
                flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 transition-colors duration-300
                ${isActive
                ? "bg-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white"
            }
            `}>
                <Users size={20} />
            </div>

            {/* Content Area */}
            <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                <div className="flex justify-between items-center">
                    {/* Title */}
                    <h3 className={`font-semibold text-sm truncate transition-colors ${isActive ? "text-white" : "text-white/90"}`}>
                        {title}
                    </h3>

                    {/* Time Ago (Rechtsboven) */}
                    {!isLoading && lastMessage?.timestamp && (
                        <span className={`text-[10px] whitespace-nowrap ml-2 font-medium ${isActive ? "text-white/60" : "text-white/30"}`}>
                            {formatTimeAgo(lastMessage.timestamp)}
                        </span>
                    )}
                </div>

                {/* Last Message */}
                <div className={`text-xs truncate h-4 flex items-center ${isActive ? "text-white/80" : "text-white/50 group-hover:text-white/70"}`}>
                    {isLoading ? (
                        <div className="h-2 w-20 bg-white/10 rounded animate-pulse" />
                    ) : isError ? (
                        <span className="text-red-400/60 text-[10px]">Error</span>
                    ) : (
                        <span>{lastMessage?.text || <span className="italic opacity-40">No messages</span>}</span>
                    )}
                </div>
            </div>
        </div>
    );
}