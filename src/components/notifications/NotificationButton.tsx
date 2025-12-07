import { Bell } from "lucide-react";
import { Badge } from "@heroui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { NotificationList } from "@/components/notifications/NotificationList.tsx";
import {useNotificationAmount, useRemoveNotification} from "@/hooks/useNotification.ts";
import { useState } from "react";
import { NotificationModal } from "@/components/notifications/NotificationModal.tsx";
import { Notification } from "@/model/notification.ts";
import { AllNotificationsModal } from "@/components/notifications/AllNotificationsModal.tsx";

export interface NotificationProps {
    open: boolean;
}

export function NotificationButton({ open }: NotificationProps) {
    const { isError, isLoading, notificationsAmount } = useNotificationAmount();

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
    const [isAllNotificationsOpen, setIsAllNotificationsOpen] = useState(false);
    const {RemoveNotification } = useRemoveNotification();

    if (isError) return <div>Small Error</div>;

    const displayAmount = isLoading ? 0 : (notificationsAmount ?? 0);

    const handleOpenAllNotifications = () => {
        setIsPopoverOpen(false);
        setIsAllNotificationsOpen(true);
    };

    return (
        <>
            <div className="h-px bg-border my-3 mx-2"></div>

            <Popover
                showArrow
                isOpen={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                offset={10}
                placement="right-start"
            >
                <PopoverTrigger>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 p-3 rounded-lg transition-all group relative overflow-hidden hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="relative z-10">
                            {!open ? (
                                <Badge
                                    color="danger"
                                    content={displayAmount > 0 ? displayAmount : undefined}
                                    shape="circle"
                                    isInvisible={displayAmount === 0}
                                >
                                    <Bell size={20} className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"/>
                                </Badge>
                            ) : (
                                <Bell size={20} className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"/>
                            )}
                        </div>

                        {open ? (
                            <div className="flex justify-between items-center w-full relative z-10">
                                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                    Notifications
                                </span>
                                {displayAmount > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        {displayAmount}
                                    </span>
                                )}
                            </div>
                        ) : (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 pointer-events-none transition-opacity whitespace-nowrap shadow-lg border border-border z-50">
                                Notifications
                            </div>
                        )}
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-[320px] max-h-[400px] overflow-y-auto border border-white/10 bg-black/40 dark:bg-black/60 backdrop-blur-xl shadow-lg">
                    <NotificationList
                        notificationsSize={displayAmount}
                        onNotificationClick={(notification: Notification) => {
                            setSelectedNotification(notification);
                            setIsPopoverOpen(false);
                        }}
                        onViewAllClick={handleOpenAllNotifications}
                    />
                </PopoverContent>
            </Popover>


            <NotificationModal
                title={selectedNotification?.title || ""}
                message={selectedNotification?.body || ""}
                date={selectedNotification?.createdAt}
                open={!!selectedNotification}
                action={async () => {
                    await RemoveNotification(selectedNotification!.id)
                    setSelectedNotification(null);
                    setIsPopoverOpen(true);
                }}
            />

            <AllNotificationsModal
                open={isAllNotificationsOpen}
                onClose={() => setIsAllNotificationsOpen(false)}
                onSelectNotification={(notification) => {
                    setIsAllNotificationsOpen(false);
                    setSelectedNotification(notification);
                }}
            />
        </>
    );
}