import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Button } from "@heroui/react";
import { BellRing } from "lucide-react";

interface NotificationModalProps {
    title: string;
    message: string;
    date?: string | Date;
    open: boolean;
    action: () => void;
}

export function NotificationModal({ title, message, date, open, action }: NotificationModalProps) {

    const formatDate = (dateStr?: string | Date) => {
        if (!dateStr) return "";
        return new Date(dateStr).toLocaleString('nl-NL', {
            weekday: 'short',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Modal
            backdrop="blur"
            isOpen={open}
            onClose={action}
            hideCloseButton
            size="lg"
            classNames={{
                base: "bg-black/20 dark:bg-black/40 backdrop-blur-3xl border border-white/10 shadow-[0_0_30px_-5px_rgba(255,255,255,0.05)]",
                header: "border-b border-white/5 pb-4",
                body: "py-6",
                footer: "border-t border-white/5 pt-4",
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
                {() => (
                    <>
                        <ModalHeader className="flex flex-row justify-between items-start gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/20 text-primary shadow-inner">
                                    <BellRing size={20} />
                                </div>
                                <span className="text-lg font-semibold text-white tracking-wide">{title}</span>
                            </div>

                            {date && (
                                <div className="flex flex-col items-end pt-1">
                                    <span className="text-[10px] uppercase tracking-wider text-default-400 font-medium opacity-70">
                                        Received
                                    </span>
                                    <span className="text-xs text-default-300 font-medium whitespace-nowrap">
                                        {formatDate(date)}
                                    </span>
                                </div>
                            )}
                        </ModalHeader>

                        <ModalBody>
                            <p className="text-default-300 leading-relaxed text-sm font-light tracking-wide">
                                {message}
                            </p>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/5 font-medium backdrop-blur-md"
                                onPress={action}
                                size="sm"
                                radius="lg"
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