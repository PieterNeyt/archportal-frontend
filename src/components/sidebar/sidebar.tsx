import {SidebarMainBody} from "@/components/sidebar/mainbody.tsx";
import {SidebarHeader} from "@/components/sidebar/header.tsx";
import {SidebarFooter} from "@/components/sidebar/footer/footer.tsx";
import React, {useState} from 'react';

export function GameLauncherSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    const handleSidebarClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        if (!target.closest('button') && !target.closest('a')) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <aside
            onClick={handleSidebarClick}
            className={`${
                isOpen ? 'w-64' : 'w-20'
            } bg-black/40 backdrop-blur-xl border-r border-white/10 text-card-foreground transition-all duration-300 ease-in-out flex flex-col cursor-pointer hover:border-primary/20 relative z-20`}
            style={{
                backdropFilter: 'blur(20px)',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
        >
            <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen}/>
            <SidebarMainBody isOpen={isOpen}/>
            <SidebarFooter isOpen={isOpen}/>
        </aside>
    );
}