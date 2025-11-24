'use client';

import {useContext, useState} from "react";
import {PlusIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import SecurityContext from "@/context/SecurityContext.ts";
import SidebarLogin from "@/components/sidebar/footer/SidebarLogin.tsx";
import SidebarUserProfile from "@/components/sidebar/footer/SidebarUserProfile.tsx";
import DropdownButton from "@/components/sidebar/footer/DropdownButton.tsx";

interface FooterProps {
    isOpen: boolean;
}

export function SidebarFooter({isOpen}: FooterProps) {
    const {loggedInUser, logout} = useContext(SecurityContext);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="p-4 border-t border-border relative">
            {!loggedInUser ? (
                <SidebarLogin isOpen={isOpen}/>
            ) : (
                <>
                    <SidebarUserProfile isOpen={isOpen} dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}/>
                </>
            )}

            {loggedInUser && !loggedInUser.hasStudio && (
                <div
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-all group cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation()
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
            )}

            {dropdownOpen && (
                <div
                    className="absolute bottom-full mb-2 left-0 w-48 bg-card border border-border rounded-lg shadow-lg flex flex-col overflow-hidden z-50"
                >
                    <DropdownButton text={"User Account"} onClick={() => {
                        setDropdownOpen(false);
                        navigate("#profile");
                    }}/>
                    {loggedInUser?.hasStudio ? (
                        <DropdownButton text={"Game studio"} onClick={() => {
                            setDropdownOpen(false);
                            navigate("#gamestudio");
                        }}/>
                    ) : (
                        <DropdownButton text={"Create game studio"} onClick={() => {
                            setDropdownOpen(false);
                            navigate("/create/gamestudio")
                        }}/>
                    )}
                    <DropdownButton text={"Log out"} onClick={() => {
                        setDropdownOpen(false);
                        navigate("/");
                        logout();
                    }}/>
                </div>
            )}
        </div>
    );
}
