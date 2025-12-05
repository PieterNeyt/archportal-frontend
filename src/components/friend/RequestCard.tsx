import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import {Button, ButtonGroup} from "@heroui/button";
import {AlertTriangle, Check, X} from "lucide-react";
import {useAcceptFriendRequest, useDeclineFriendRequest} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";

interface RequestCardProps {
    icon: string;
    gamerTag: string;
}

export default function RequestCard({icon, gamerTag}: RequestCardProps) {
    const {isPending: isPendingAccept, isError: isErrorAccept, acceptFriendRequest} = useAcceptFriendRequest();
    const {isPending: isPendingDecline, isError: isErrorDecline, declineFriendRequest} = useDeclineFriendRequest();

    let acceptButtonContent;
    if (isPendingAccept) {
        acceptButtonContent = <CircularProgress size="sm" color="default"/>;
    } else if (isErrorAccept) {
        acceptButtonContent = <AlertTriangle size={20}/>;
    } else {
        acceptButtonContent = <Check size={20}/>;
    }

    let declineButtonContent;
    if (isPendingDecline) {
        declineButtonContent = <CircularProgress size="sm" color="default"/>;
    } else if (isErrorDecline) {
        declineButtonContent = <AlertTriangle size={20}/>;
    } else {
        declineButtonContent = <X size={20}/>;
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
            <ButtonGroup size={"sm"} className={"ml-4 flex-shrink-0"}>
                <Button
                    isIconOnly
                    disabled={isPendingAccept || isPendingDecline}
                    color={"success"}
                    variant={"shadow"}
                    aria-label={"Accept friend request"}
                    onPress={() => acceptFriendRequest(gamerTag)}
                >
                    {acceptButtonContent}
                </Button>
                <Button
                    isIconOnly
                    disabled={isPendingDecline || isPendingAccept}
                    color={"danger"}
                    variant={"shadow"}
                    aria-label={"Decline friend request"}
                    onPress={() => declineFriendRequest(gamerTag)}
                >
                    {declineButtonContent}
                </Button>
            </ButtonGroup>
        </div>
    );
}