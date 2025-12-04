import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import {Input} from "@heroui/input";
import {useState} from "react";
import {useSendFriendRequest} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";
import {Send, UserPlus} from "lucide-react";
import {Button} from "@heroui/button";
import {inputClasses} from "@/styles/customClasses.ts";
import axios from "axios";

export default function AddFriendModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username, setUsername] = useState('');
    const {isPending, isError, sendFriendRequest, reset} = useSendFriendRequest();

    const handleSendFriendRequest = async (onClose: () => void) => {
        if (!username.trim() || isPending) return;
        try {
            await sendFriendRequest(username);
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error))
                console.error(error.response?.data?.message);
            else console.error("An unknown error occurred: ", error);
        }
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            reset();
            setUsername("");
        }
        onOpenChange();
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

            <Modal isOpen={isOpen} onOpenChange={handleOpenChange} placement={"center"}
                   className={"bg-black/30 backdrop-blur-xl border border-white/10"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className={"flex flex-col gap-1 "}>
                                Send friend request
                            </ModalHeader>
                            <ModalBody>
                                <p className={"text-sm mb-2"}>
                                    Enter the username of the person you want to send a request to.
                                </p>

                                <Input
                                    isRequired
                                    label={"Username"}
                                    aria-label={"Username"}
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
                                    onPress={onClose}
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