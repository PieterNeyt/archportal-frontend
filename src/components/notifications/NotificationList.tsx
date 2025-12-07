import { useFirstFiveNotifications } from "@/hooks/useNotification.ts";
import { CircularProgress } from "@heroui/progress";
import { Notification } from "@/model/notification.ts";

export interface NotificationProps {
    notificationsSize: number;
    onNotificationClick: (notification: Notification) => void;
    onViewAllClick: () => void;
}

export function NotificationList({ notificationsSize, onNotificationClick, onViewAllClick }: NotificationProps) {
    const { isError, isLoading, notifications } = useFirstFiveNotifications();

    const CenterBox = ({ children }: { children: React.ReactNode }) => (
        <div className="flex flex-1 min-h-[200px] items-center justify-center text-sm text-default-400">
            {children}
        </div>
    );

    const formatListDate = (dateStr?: string | Date) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();

        return isToday
            ? date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="px-1 py-2 w-full flex flex-col gap-2 min-h-[200px]">
            <div className="flex justify-between items-center px-1 mb-2">
                <p className="text-sm font-bold text-white tracking-wide">Notifications</p>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/70">
                    {notificationsSize} new
                </span>
            </div>

            {isLoading && <CenterBox><CircularProgress color="primary" /></CenterBox>}
            {(isError || !notifications) && !isLoading && <CenterBox>Er ging iets mis</CenterBox>}
            {notifications && notifications.length === 0 && !isLoading && <CenterBox>No Notifications found</CenterBox>}

            {notifications && notifications.length > 0 && (
                <div className="flex flex-col gap-2">
                    {notifications.slice(0, 5).map((notification) => (
                        <div
                            key={notification.id}
                            className="group relative flex flex-col p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                            onClick={(e) => {
                                e.stopPropagation();
                                onNotificationClick(notification);
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="flex justify-between items-start w-full mb-1 relative z-10">
                                <span className="text-sm font-medium text-white/90 truncate pr-2">
                                    {notification.title}
                                </span>
                                <span className="text-[10px] text-white/40 whitespace-nowrap font-mono">
                                    {formatListDate(notification.createdAt)}
                                </span>
                            </div>

                            <span className="text-xs text-white/60 line-clamp-2 leading-relaxed relative z-10">
                                {notification.body}
                            </span>

                            <span className="absolute top-3.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(var(--primary),0.8)]"></span>
                        </div>
                    ))}

                    {notificationsSize > 5 && (
                        <button
                            onClick={onViewAllClick}
                            className="mt-2 w-full flex items-center justify-center gap-2 text-xs text-white font-medium py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3 text-white/70"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            Show All Notifications
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}