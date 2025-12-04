import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import {Button, ButtonGroup} from "@heroui/button";
import {Check, X} from "lucide-react";

interface RequestCardProps {
    icon: string;
    gamerTag: string;
}

export default function RequestCard({icon, gamerTag}: RequestCardProps) {
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
                    color={"success"}
                    variant={"shadow"}
                    aria-label={"Accept friend request"}
                    onPress={() => {
                        console.log("Accept friend request")
                    }}
                >
                    <Check size={20}/>
                </Button>
                <Button
                    isIconOnly
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