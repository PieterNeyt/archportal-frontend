'use client';

import {useContext, useState} from "react";
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

            {dropdownOpen && (
                <div
                    className="absolute bottom-full mb-2 left-0 w-48 bg-card border border-border rounded-lg shadow-lg flex flex-col overflow-hidden z-50"
                >
                    <DropdownButton text={"Settings"} onClick={() => {
                        setDropdownOpen(false);
                        navigate("/user/settings");
                    }}/>
                    {!loggedInUser?.hasStudio && (
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
