import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import SecurityContext from "@/context/SecurityContext.ts";
import * as React from "react";
import {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@heroui/button";

interface SidebarUserProfileProps {
    isOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dropdownOpen: boolean;
}

export default function SidebarUserProfile({isOpen, dropdownOpen, setDropdownOpen}: SidebarUserProfileProps) {
    const {loggedInUser} = useContext(SecurityContext);
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
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
            {isOpen && <Button onPress={() => setDropdownOpen(!dropdownOpen)}
                               isIconOnly
                               className={"rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"}
                               aria-expanded={dropdownOpen}
                               aria-label={"Toggle profile menu"}
            >
                {dropdownOpen ? (
                    <ChevronUp size={20}/>
                ) : (
                    <ChevronDown size={20}/>
                )}
            </Button>}

        </div>
    );
}