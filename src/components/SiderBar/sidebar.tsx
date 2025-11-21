import {useEffect, useState} from 'react';
import {SidebarMainBody} from "@/components/SiderBar/mainbody.tsx";
import {SidebarHeader} from "@/components/SiderBar/header.tsx";
import {SidebarFooter} from "@/components/SiderBar/footer.tsx";


export function GameLauncherSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const handleSidebarClick = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        if (!target.closest('button') && !target.closest('a')) {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="flex h-screen bg-background">
            <aside
                onClick={handleSidebarClick}
                className={`${
                    isOpen ? 'w-64' : 'w-20'
                } bg-card border-r border-border text-card-foreground transition-all duration-300 ease-in-out flex flex-col cursor-pointer hover:border-primary/20`}
            >
                <SidebarHeader isOpen={isOpen} setIsOpen={setIsOpen}/>
                <SidebarMainBody isOpen={isOpen}/>
                <SidebarFooter isOpen={isOpen} isDark={isDark} setIsDark={setIsDark}/>
            </aside>
        </div>
    );
}