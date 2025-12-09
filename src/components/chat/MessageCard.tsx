interface MessageCardProps {
    text: string;
    timestamp: string;
    isYours: boolean
}

export default function MessageCard({text, timestamp, isYours}: MessageCardProps) {

    return (
        <div
            className={`flex gap-3 ${isYours ? 'flex-row-reverse' : 'flex-row'}`}
        >
            <div className="text-2xl flex-shrink-0">👤</div>
            <div className={`flex flex-col ${isYours ? 'items-end' : 'items-start'} max-w-md`}>
                <div
                    className={`rounded-2xl px-4 py-2 ${
                        isYours
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                            : 'bg-slate-800/80 text-white'
                    }`}
                >
                    <p className="text-sm">{text}</p>
                </div>
                <span className="text-xs text-slate-500 mt-1 px-2">
                    {timestamp}
                </span>
            </div>
        </div>
    );
}