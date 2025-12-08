import {Avatar} from "@heroui/avatar";
import {User} from "@heroui/user";
import {AlertTriangle, X} from "lucide-react";
import {Button} from "@heroui/button";
import {useRemoveFriend} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";
import useToastEffect from "@/hooks/useToastEffect.ts";

interface UserProps {
    gamerTag: string;
    icon: string
}

export default function FriendCard({gamerTag, icon}: UserProps) {
    const remove = useRemoveFriend();

    useToastEffect(remove, "Friend removed", "Failed to remove friend", "The friend has been removed from your list.");

    let buttonContent;
    if (remove.isPending) {
        buttonContent = <CircularProgress size={"sm"} color={"default"}/>;
    } else if (remove.isError) {
        buttonContent = <AlertTriangle size={20}/>;
    } else {
        buttonContent = <X size={20}/>;
    }

    return (
        <div
            className={"backdrop-blur-sm flex items-center justify-between p-3 rounded-xl border border-border hover:backdrop-blur-3xl transition-colors cursor-pointer shadow-md"}
            onClick={() => console.log("navigate to profile")}
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

            <Button
                isIconOnly
                disabled={remove.isPending}
                color={"danger"}
                variant={"shadow"}
                aria-label={"Remove friend"}
                onPress={() => remove.removeFriend(gamerTag)}
            >
                {buttonContent}
            </Button>
        </div>
    );
}