import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/react";
import {Button} from "@heroui/button";

interface MessageModalProps {
    title: string;
    message: string;
    open: boolean;
    action: () => void;
}

export function MessageModal({title, message, open, action}: MessageModalProps) {
    return (
        <Modal
            isDismissable={false}
            isKeyboardDismissDisabled={true}
            isOpen={open}
            classNames={{
                base: "bg-transparent",
                backdrop: "bg-black/50",
            }}
        >
            <ModalContent className="bg-black/30 backdrop-blur-xl border border-white/10">
                <>
                    <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                    <ModalBody>
                        {message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={action}>
                            Ok
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}