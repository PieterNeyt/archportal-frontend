import {useState} from 'react';
import {SidebarMainBody} from "@/components/SiderBar/mainbody.tsx";
import {SidebarHeader} from "@/components/SiderBar/header.tsx";
import {SidebarFooter} from "@/components/SiderBar/footer.tsx";
import Starfield from "@/layouts/background.tsx";


export function GameLauncherSidebar() {
    const [isOpen, setIsOpen] = useState(true);

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
                <SidebarFooter isOpen={isOpen}/>
                <Starfield
                    starCount={1000}
                    starColor={[255, 255, 255]}
                    speedFactor={0.05}
                />
            </aside>

        </div>
    );
}