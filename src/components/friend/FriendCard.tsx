import {Avatar} from "@heroui/avatar";
import {User} from "@heroui/user";
import {AlertTriangle, X} from "lucide-react";
import {Button} from "@heroui/button";
import {useRemoveFriend} from "@/hooks/useFriends.ts";
import {CircularProgress} from "@heroui/progress";
import useToastEffect from "@/hooks/useToastEffect.ts";
import {useBenefits} from "@/hooks/useBenefits.ts";
import {useMemo} from "react";

interface UserProps {
    gamerTag: string;
    icon: string;
    activeUsernameColorId?: string;
}

export default function FriendCard({gamerTag, icon, activeUsernameColorId}: UserProps) {
    const remove = useRemoveFriend();
    const { data: benefits } = useBenefits();

    useToastEffect(remove, "Friend removed", "Failed to remove friend", "The friend has been removed from your list.");


    const activeColor = useMemo(() => {
        if (!activeUsernameColorId || !benefits) return undefined;
        return benefits.find(b => b.id === activeUsernameColorId)?.configuration;
    }, [activeUsernameColorId, benefits]);

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
            className={"backdrop-blur-sm flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all cursor-pointer shadow-md"}
            onClick={() => console.log("navigate to profile")}
        >
            <User
                avatarProps={{
                    src: icon,
                    fallback: <Avatar showFallback />,
                    name: gamerTag,
                    className: "w-10 h-10 flex-shrink-0"
                }}
                name={
                    <span
                        className="text-base font-bold truncate"
                        style={activeColor ? { color: activeColor } : {}}
                    >
                        {gamerTag}
                    </span>
                }
                classNames={{
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