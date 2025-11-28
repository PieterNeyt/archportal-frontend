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
        >
            <ModalContent>
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            {message}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={action}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
            </ModalContent>
        </Modal>
    )
}