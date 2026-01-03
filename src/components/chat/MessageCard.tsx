import {User} from "lucide-react";

interface MessageCardProps {
    text: string;
    timestamp: string;
    isYours: boolean;
}

export default function MessageCard({ text, timestamp, isYours }: MessageCardProps) {
    const messageDate = new Date(timestamp);
    const today = new Date();

    const isToday =
        messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear();

    const formattedTime = isToday
        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : messageDate.toLocaleString([], {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');

    return (
        <div
            className={`flex gap-2 w-full ${isYours ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center ring-1 ring-slate-800">
                    <User size={16} className="text-slate-300" />
                </div>
            </div>

            <div className={`flex flex-col ${isYours ? 'items-end' : 'items-start'} max-w-[50%]`}>
                <div
                    className={`relative rounded-2xl px-3 py-1.5 pb-5 min-w-[130px] shadow-sm ${
                        isYours
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none'
                            : 'bg-slate-800 text-white rounded-tl-none'
                    }`}
                >
                    <p className="text-sm whitespace-pre-wrap break-all leading-normal">
                        {text}
                    </p>

                    <span
                        className={`absolute bottom-1 text-[10px] text-white/70 select-none whitespace-nowrap ${
                            isYours ? 'left-3' : 'right-3'
                        }`}
                    >
                        {formattedTime}
                    </span>
                </div>
            </div>
        </div>
    );
}