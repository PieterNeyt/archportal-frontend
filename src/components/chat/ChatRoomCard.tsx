import {User} from "@heroui/user";
import {Users} from "lucide-react";

interface ChatRoomCardProps {
    title: string;
    onClick: () => void;
}

export default function ChatRoomCard({title, onClick}: ChatRoomCardProps) {
    return (
        <div
            className={"backdrop-blur-sm flex items-center justify-between p-3 rounded-xl border border-border hover:backdrop-blur-3xl transition-colors cursor-pointer shadow-md"}
            onClick={onClick}>
            <User
                avatarProps={{
                    icon: <Users/>
                }}
                name={title}

                classNames={{
                    name: "text-base font-bold text-foreground truncate",
                    wrapper: "flex-1 min-w-0"
                }}
            />
        </div>
    );
}