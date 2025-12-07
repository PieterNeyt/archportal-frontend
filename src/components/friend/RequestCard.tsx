import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import {Button, ButtonGroup} from "@heroui/button";
import {AlertTriangle, Check, X} from "lucide-react";
import {useAcceptFriendRequest, useCancelFriendRequest, useDeclineFriendRequest} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";
import useToastEffect from "@/hooks/useToastEffect.ts";

interface RequestCardProps {
    icon: string;
    gamerTag: string;
    type: "incoming" | "outgoing";
}

export default function RequestCard({icon, gamerTag, type}: RequestCardProps) {
    const accept = useAcceptFriendRequest();
    const decline = useDeclineFriendRequest();
    const cancel = useCancelFriendRequest();

    useToastEffect(accept, "Friend request accepted", "Failed to accept friend request", "You accepted the friend request.");
    useToastEffect(decline, "Friend request declined", "Failed to accept friend request", "You declined the friend request.");
    useToastEffect(cancel, "Friend request cancelled", "Failed to accept friend request", "You canceled the friend request.");

    const getButtonContent = (action: typeof accept | typeof decline | typeof cancel, successIcon: JSX.Element, errorIcon: JSX.Element) => {
        if (action.isPending) return <CircularProgress size="sm" color="default"/>;
        if (action.isError) return errorIcon;
        return successIcon;
    }

    return (
        <div
            className={"backdrop-blur-sm flex items-center justify-between p-3 rounded-xl border border-border hover:backdrop-blur-3xl transition-colors cursor-pointer shadow-md"}
        >
            <User
                avatarProps={{
                    src: icon,
                    fallback: (
                        <Avatar
                            showFallback
                        />
                    ),
                    name: gamerTag,
                    className: "w-10 h-10 flex-shrink-0"
                }}
                name={gamerTag}

                classNames={{
                    name: "text-base font-bold text-foreground truncate",
                    wrapper: "flex-1 min-w-0"
                }}
            />
            {type === "incoming" && (
                <ButtonGroup size={"sm"} className={"ml-4 flex-shrink-0"}>
                    <Button
                        isIconOnly
                        disabled={accept.isPending || decline.isPending}
                        color={"success"}
                        variant={"shadow"}
                        aria-label={"Accept friend request"}
                        onPress={() => accept.acceptFriendRequest(gamerTag)}
                    >
                        {getButtonContent(accept, <Check size={20}/>, <AlertTriangle size={20}/>)}
                    </Button>
                    <Button
                        isIconOnly
                        disabled={decline.isPending || accept.isPending}
                        color={"danger"}
                        variant={"shadow"}
                        aria-label={"Decline friend request"}
                        onPress={() => decline.declineFriendRequest(gamerTag)}
                    >
                        {getButtonContent(decline, <X size={20}/>, <AlertTriangle size={20}/>)}
                    </Button>
                </ButtonGroup>)
            }

            {type === "outgoing" && (
                <Button
                    isIconOnly
                    disabled={cancel.isPending}
                    color={"danger"}
                    variant={"shadow"}
                    aria-label={"Cancel friend request"}
                    onPress={() => cancel.cancelFriendRequest(gamerTag)}
                >
                    {getButtonContent(cancel, <X size={20}/>, <AlertTriangle size={20}/>)}
                </Button>
            )}
        </div>
    );
}