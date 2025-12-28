import {User} from "@heroui/user";
import {Avatar} from "@heroui/avatar";
import SecurityContext from "@/context/SecurityContext.ts";
import React, {useContext, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {ChevronDown, ChevronUp} from "lucide-react";
import {Button} from "@heroui/button";
import { useInventory} from "@/hooks/useBenefits.ts";

interface SidebarUserProfileProps {
    isOpen: boolean;
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dropdownOpen: boolean;
}

export default function SidebarUserProfile({isOpen, dropdownOpen, setDropdownOpen}: SidebarUserProfileProps) {
    const {loggedInUser} = useContext(SecurityContext);
    const {data: myBenefits = []} = useInventory(loggedInUser?.platformBenefits);
    const navigate = useNavigate();

    const activeColor = useMemo(() => {
        if (!loggedInUser?.activeUsernameColorId || !myBenefits) return undefined;
        return myBenefits.find(b => b.id === loggedInUser.activeUsernameColorId)?.configuration;
    }, [loggedInUser, myBenefits]);

    const hasCustomAvatar =
        loggedInUser?.icon && loggedInUser.icon.trim() !== "";

    return (
        <div
            className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();
                navigate("#profile");
            }}
        >
            {hasCustomAvatar ? (
                <User
                    avatarProps={{
                        src: loggedInUser!.icon,
                        isBordered: true,
                        className: "w-10 h-10 flex-shrink-0"
                    }}
                    name={isOpen ? loggedInUser?.gamerTag : ""}
                    classNames={{
                        name: "text-sm font-bold",
                        wrapper: "flex-1 min-w-0"
                    }}
                    style={{ color: activeColor || "inherit" }}
                />
            ) : (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Avatar
                        isBordered
                        className="w-10 h-10 flex-shrink-0"
                        name={loggedInUser?.gamerTag}
                    />
                    {isOpen && (
                        <span
                            className="text-sm font-bold truncate"
                            style={{ color: activeColor || "inherit" }}
                        >
                            {loggedInUser?.gamerTag}
                        </span>
                    )}
                </div>
            )}

            {isOpen && (
                <Button
                    onPress={() => setDropdownOpen(!dropdownOpen)}
                    isIconOnly
                    className="rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                    aria-expanded={dropdownOpen}
                    aria-label="Toggle profile menu"
                >
                    {dropdownOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                </Button>
            )}
        </div>
    );
}
