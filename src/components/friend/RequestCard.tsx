import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import {Button, ButtonGroup} from "@heroui/button";
import {AlertTriangle, Check, X} from "lucide-react";
import {useAcceptFriendRequest} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";

interface RequestCardProps {
    icon: string;
    gamerTag: string;
}

export default function RequestCard({icon, gamerTag}: RequestCardProps) {
    const {isPending, isError, acceptFriendRequest} = useAcceptFriendRequest();

    let acceptButtonContent;
    if (isPending) {
        acceptButtonContent = <CircularProgress size="sm" color="default"/>;
    } else if (isError) {
        acceptButtonContent = <AlertTriangle size={20}/>;
    } else {
        acceptButtonContent = <Check size={20}/>;
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
                    disabled={isPending}
                    color={"success"}
                    variant={"shadow"}
                    aria-label={"Accept friend request"}
                    onPress={() => acceptFriendRequest(gamerTag)}
                >
                    {acceptButtonContent}
                </Button>
                <Button
                    isIconOnly
                    disabled={isPending}
                    color={"danger"}
                    variant={"shadow"}
                    aria-label={"Decline friend request"}
                    onPress={() => {
                        console.log("Decline friend request")
                    }}
                >
                    <X size={20}/>
                </Button>
            </ButtonGroup>
        </div>
    );
}