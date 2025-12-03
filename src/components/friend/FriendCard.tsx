import {Avatar} from "@heroui/avatar";
import {User} from "@heroui/user";

interface UserProps {
    gamerTag: string;
    icon: string
}

export default function FriendCard({gamerTag, icon}: UserProps) {
    return (
        <div
            className={"flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-accent transition-colors cursor-pointer shadow-md"}
            onClick={() => console.log("navigate to profile")}
        >
            <User
                avatarProps={{
                    src: icon,
                    isBordered: true,
                    fallback: (
                        <Avatar
                            showFallback
                            src={icon}
                        />
                    ),
                    className: "w-10 h-10 flex-shrink-0"
                }}
                name={gamerTag}

                classNames={{
                    name: "text-base font-bold text-foreground truncate",
                    wrapper: "flex-1 min-w-0"
                }}
            />
        </div>
    );
}