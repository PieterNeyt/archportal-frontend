import {useFirstFiveNotifications} from "@/hooks/useNotification.ts";
import {CircularProgress} from "@heroui/progress";

export interface NotificationProps {
    notificationsSize: number;
}

export function NotificationList({notificationsSize}: NotificationProps) {
    const {isError, isLoading, notifications} = useFirstFiveNotifications();

    const CenterBox = ({children}: {children: React.ReactNode}) => (
        <div className="flex flex-1 min-h-[200px] items-center justify-center text-sm text-muted-foreground">
            {children}
        </div>
    );

    return (
        <div className="px-2 py-2 w-full flex flex-col gap-1 min-h-[200px]">
            <p className="text-sm font-bold text-foreground mb-2">Notifications</p>

            {isLoading && (
                <CenterBox>
                    <CircularProgress />
                </CenterBox>
            )}

            {(isError || !notifications) && !isLoading && (
                <CenterBox>
                    Something went wrong while getting your notifications
                </CenterBox>
            )}

            {notifications && notifications.length === 0 && !isLoading && (
                <CenterBox>
                    No notifications found
                </CenterBox>
            )}

            {notifications && notifications.length > 0 && (
                <div className="flex flex-col gap-1">
                    {notifications.slice(0, 5).map((notification) => (
                        <div
                            key={notification.id}
                            className="flex justify-between items-start p-2 rounded-lg border border-border hover:bg-primary/10 transition-colors cursor-pointer"
                        >
                            <div className="flex flex-col truncate">
                                <span className="truncate text-sm text-foreground">
                                    {notification.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {notification.body}
                                </span>
                            </div>

                            <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-1"></span>
                        </div>
                    ))}

                    {notificationsSize > 5 && (
                        <button
                            className="mt-2 w-full text-sm text-primary font-medium py-2 rounded-lg hover:bg-primary/10 transition-colors"
                            onClick={() => console.log("Load more notifications")}
                        >
                            More notifications
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
