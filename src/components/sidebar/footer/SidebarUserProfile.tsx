import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import SecurityContext from "@/context/SecurityContext.ts";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";

interface SidebarUserProfileProps {
    isOpen: boolean;
}

export default function SidebarUserProfile({isOpen}: SidebarUserProfileProps) {
    const {loggedInUser} = useContext(SecurityContext);
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
            onClick={(e) => {
                e.stopPropagation()
                navigate("#profile")
            }}
        >
            <User
                avatarProps={{
                    src: loggedInUser!.icon,
                    isBordered: true,
                    fallback: (
                        <Avatar
                            showFallback
                            src={loggedInUser!.icon}
                        />
                    ),

                    className: "w-10 h-10 flex-shrink-0"
                }}
                name={isOpen ? loggedInUser!.firstName + " " + loggedInUser!.lastName : ""}

                classNames={{
                    name: "text-sm font-bold text-foreground",
                    wrapper: "flex-1 min-w-0"
                }}
            />
        </div>
    );
}