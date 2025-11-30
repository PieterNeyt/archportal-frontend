import {LogIn} from "lucide-react";
import {useContext} from "react";
import SecurityContext from "@/context/SecurityContext.ts";

interface SidebarLoginProps {
    isOpen: boolean;
}

export default function SidebarLogin({isOpen}: SidebarLoginProps) {
    const {login} = useContext(SecurityContext);

    return (
        <div
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
            onClick={(e) => {
                e.stopPropagation()
                login()
            }}
        >
            <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg"
            >
                <LogIn className="text-primary-foreground" size={16}/>
            </div>
            {isOpen && (
                <span className="text-sm font-bold text-foreground">
                Login
            </span>
            )}
        </div>
    );
}