import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@heroui/react";
import {Button} from "@heroui/button";
import {AlertTriangle, UserPlus} from "lucide-react";
import {useFriends} from "@/hooks/useFriends.ts";
import FriendSkeletonCard from "@/components/friend/FriendSkeletonCard.tsx";
import InviteFriendCard from "@/components/party/InviteFriendCard.tsx";

const SKELETON_COUNT = 3

export default function InviteFriendModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isLoading, isError, profiles, refetch} = useFriends();


    return (
        <>
            <Button
                variant={"bordered"}
                className={"w-full border-white/10 text-white hover:bg-white/5 font-medium h-12"}
                startContent={<UserPlus size={20}/>}
                onPress={onOpen}
            >
                Invite friends
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement={"center"} scrollBehavior={"inside"}
                   className={"bg-black/30 backdrop-blur-xl border border-white/10 pb-2"}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className={"flex flex-col gap-1 "}>
                                Send party invite
                            </ModalHeader>
                            <ModalBody>
                                {isError && (
                                    <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
                                        <div className="p-3 bg-danger-500/10 rounded-full">
                                            <AlertTriangle className="text-danger-500" size={32}/>
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Failed to load friends</p>
                                            <p className="text-sm text-white/50">Check your connection and try
                                                again.</p>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="flat"
                                            color="danger"
                                            onPress={() => refetch()}
                                            className="mt-2"
                                        >
                                            Try Again
                                        </Button>
                                    </div>
                                )}

                                {isLoading && Array(SKELETON_COUNT).fill(0).map((_, index) => (
                                    <FriendSkeletonCard key={index}/>
                                ))}

                                {!isLoading && !isError && profiles?.length === 0 && (
                                    <div className="py-10 text-center text-white/40 text-sm">
                                        No friends online to invite.
                                    </div>
                                )}

                                {!isLoading && !isError && profiles && profiles?.length > 0 && profiles?.map((profile, index) => (
                                    <InviteFriendCard key={index} gamerTag={profile.gamerTag} icon={profile.icon}/>
                                ))}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}