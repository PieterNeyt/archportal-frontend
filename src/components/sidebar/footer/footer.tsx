'use client';

import {useContext} from "react";
import {PlusIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import SecurityContext from "@/context/SecurityContext.ts";
import SidebarLogin from "@/components/sidebar/footer/SidebarLogin.tsx";
import SidebarLogout from "@/components/sidebar/footer/SidebarLogout.tsx";
import SidebarUserProfile from "@/components/sidebar/footer/SidebarUserProfile.tsx";

interface FooterProps {
    isOpen: boolean;
}

export function SidebarFooter({isOpen}: FooterProps) {
    const {loggedInUser} = useContext(SecurityContext);
    const navigate = useNavigate();
    // const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="p-4 border-t border-border relative">
            {!loggedInUser ? (
                <SidebarLogin isOpen={isOpen}/>
            ) : (
                <>
                    <SidebarLogout isOpen={isOpen}/>
                    <SidebarUserProfile isOpen={isOpen}/>
                </>
            )}

            <div
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation()
                    // setDropdownOpen(!dropdownOpen)
                    navigate("/create/gamestudio");
                }}
            >
                <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg"
                >
                    <PlusIcon className="text-primary-foreground" size={16}/>
                </div>
                {isOpen && (
                    <span className="text-sm font-bold text-foreground">
                        Create Studio
                    </span>
                )}
            </div>

            {/*{dropdownOpen && (*/}
            {/*    <div*/}
            {/*        className="absolute bottom-full mb-2 left-0 w-48 bg-card border border-border rounded-lg shadow-lg flex flex-col overflow-hidden z-50">*/}
            {/*        <button*/}
            {/*            className="px-4 py-2 text-sm text-foreground hover:bg-primary/10 text-left"*/}
            {/*            onClick={() => {*/}
            {/*                setDropdownOpen(false);*/}
            {/*                navigate("/create/user");*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            User Account*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            className="px-4 py-2 text-sm text-foreground hover:bg-primary/10 text-left"*/}
            {/*            onClick={() => {*/}
            {/*                setDropdownOpen(false);*/}
            {/*                navigate("/create/gamestudio");*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            Game Studio Account*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}
