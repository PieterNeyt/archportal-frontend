import {LogOut} from "lucide-react";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

interface SidebarLogoutProps {
    isOpen: boolean;
}

export default function SidebarLogout({isOpen}: SidebarLogoutProps) {
    const {logout} = useContext(SecurityContext);

    return (
        <div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
            onClick={(e) => {
                e.stopPropagation()
                logout()
            }}
        >
            <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg"
            >
                <LogOut className="text-primary-foreground" size={16}/>
            </div>
            {isOpen && (
                <span className="text-sm font-bold text-foreground">
                    Log out
                </span>
            )}
        </div>
    );
}