import {Bell} from "lucide-react";
import {Badge} from "@heroui/badge";
import {Popover, PopoverContent, PopoverTrigger} from "@heroui/react";
import {NotificationList} from "@/components/sidebar/notificationList.tsx";
import {useNotificationAmount} from "@/hooks/useNotification.ts";

export interface NotificationProps {
    open: boolean;
}

export function NotificationButton({open}: NotificationProps) {
    const {isError, isLoading, notificationsAmount} = useNotificationAmount();

    if (isError)
        return <div>Small Error </div>;

    return (
        <>
            <div className="h-px bg-border my-3 mx-2"></div>

            <Popover showArrow offset={10} placement="right-start">
                <PopoverTrigger asChild>
                    <a
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()}
                        className="flex items-center gap-3 p-3 rounded-lg transition-all group relative overflow-hidden hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {!open ? (
                            <Badge color="danger" content={isLoading || notificationsAmount} shape="circle">
                                <Bell size={20}
                                      className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors relative z-10"/>
                            </Badge>
                        ) : (
                            <Bell size={20}
                                  className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors relative z-10"/>
                        )}

                        {open ? (
                            <div className="flex justify-between items-center w-full relative z-10">
                                 <span
                                     className="font-medium text-foreground group-hover:text-primary transition-colors">
            Notifications
          </span>
                                <span
                                    className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {isLoading || notificationsAmount}
          </span>
                            </div>
                        ) : (
                            <div
                                className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-border z-50">
                                Notifications
                            </div>
                        )}
                    </a>
                </PopoverTrigger>

                <PopoverContent
                    className="w-[320px] max-h-[400px] overflow-y-auto border border-white/10 bg-black/40 dark:bg-black/60 backdrop-blur-xl shadow-lg"
                >
                    <NotificationList notificationsSize={notificationsAmount!}/>
                </PopoverContent>

            </Popover>

        </>
    );
}
