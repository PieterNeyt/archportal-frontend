import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import {Input} from "@heroui/input";
import {useState} from "react";
import {useSendFriendRequest} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";
import {Send, UserPlus} from "lucide-react";
import {Button} from "@heroui/button";

export default function AddFriendModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username, setUsername] = useState('');
    const {isPending, isError, sendFriendRequest} = useSendFriendRequest();

    const handleSendFriendRequest = async (onClose: () => void) => {
        if (!username.trim() || isPending) return;

        const success = await sendFriendRequest(username);
        if (success) {
            setUsername("");
            onClose();
        }
    }

    const inputClasses = {
        input: "bg-transparent text-white placeholder:text-white/40",
        inputWrapper: "bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/20",
    }

    return (
        <>
            <Button
                color={"primary"}
                onPress={onOpen}
                className={"h-10 flex-shrink-0 font-semibold"}
                startContent={<UserPlus size={20}/>}
            >
                Add friend
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={"center"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className={"flex flex-col gap-1 text-foreground"}>
                                Send friend request
                            </ModalHeader>
                            <ModalBody>
                                <p className={"text-sm text-muted-foreground mb-2"}>
                                    Enter the username of the person you want to send a request to.
                                </p>

                                <Input
                                    isRequired
                                    label={"Username"}
                                    placeholder={"Enter username"}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    isInvalid={isError}
                                    classNames={inputClasses}
                                    endContent={isPending ? <CircularProgress size="sm"/> : <UserPlus size={18}/>}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color={"danger"}
                                    variant={"light"}
                                    onPress={() => {
                                        setUsername("");
                                        onClose();
                                    }}
                                    isDisabled={isPending}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color={"primary"}
                                    onPress={() => handleSendFriendRequest(onClose)}
                                    isDisabled={isPending || !username.trim()}
                                    startContent={!isPending && <Send size={18}/>}
                                >
                                    {isPending ? <CircularProgress size="sm" color="default"/> : "Send Request"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}