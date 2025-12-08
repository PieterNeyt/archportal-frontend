import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { BellRing } from "lucide-react";

import { useNotifications } from "@/hooks/useNotification.ts";
import { Notification } from "@/model/notification.ts";
import { CircularProgress } from "@heroui/progress";

interface AllNotificationsModalProps {
    open: boolean;
    onClose: () => void;
    onSelectNotification: (notification: Notification) => void;
}

export function AllNotificationsModal({ open, onClose, onSelectNotification }: AllNotificationsModalProps) {
    const { isError, isLoading, notifications } = useNotifications();

    const formatDate = (dateStr?: string | Date) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleString('en-GB', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            scrollBehavior="inside"
            size="2xl"
            radius="none"
            backdrop="blur"
            hideCloseButton
            classNames={{
                base: "bg-black/20 dark:bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)] h-[80vh]",
                header: "border-b border-white/5 py-5",
                body: "p-0 bg-black/10",
                footer: "border-t border-white/5 py-4",
                backdrop: "bg-black/10 backdrop-blur-sm"
            }}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.3, ease: "easeOut" },
                    },
                    exit: {
                        y: 20,
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.2, ease: "easeIn" },
                    },
                }
            }}
        >
            <ModalContent>
                {(close) => (
                    <>
                        <ModalHeader className="flex items-center gap-4">
                            <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 text-primary shadow-inner">
                                <BellRing size={20} />
                            </div>
                            <span className="text-xl font-bold text-white tracking-wide uppercase">
                                All Notifications
                            </span>
                        </ModalHeader>

                        <ModalBody className="custom-scrollbar">
                            {isLoading && (
                                <div className="flex h-full items-center justify-center gap-3">
                                    <CircularProgress color="primary" size="sm" aria-label="Loading..." />
                                    <span className="text-white/50 text-sm">Loading notifications...</span>
                                </div>
                            )}

                            {isError && (
                                <div className="flex h-full items-center justify-center text-danger text-sm">
                                    Error loading notifications.
                                </div>
                            )}

                            {!isLoading && notifications && notifications.length === 0 && (
                                <div className="flex h-full items-center justify-center text-white/40 text-sm">
                                    No notifications found.
                                </div>
                            )}

                            {!isLoading && notifications && (
                                <div className="flex flex-col divide-y divide-white/5">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            onClick={(e) =>
                                            {
                                                e.stopPropagation();
                                                onSelectNotification(notification)
                                            }
                                            }
                                            className="
                                                group relative flex flex-col p-5 cursor-pointer transition-all
                                                hover:bg-white/10 backdrop-blur-sm
                                            "
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                            <div className="flex justify-between items-start mb-2 relative z-10">
                                                <span className="text-sm font-semibold text-white/90 group-hover:text-primary transition-colors truncate pr-4">
                                                    {notification.title}
                                                </span>
                                                <span className="text-[11px] text-white/40 font-mono whitespace-nowrap pt-0.5">
                                                    {formatDate(notification.createdAt)}
                                                </span>
                                            </div>

                                            <p className="text-xs text-white/60 leading-relaxed line-clamp-2 relative z-10">
                                                {notification.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/5 font-medium backdrop-blur-md"
                                onPress={close}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
