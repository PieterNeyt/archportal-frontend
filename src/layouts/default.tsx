import {ReactNode} from "react";
import {GameLauncherSidebar} from "@/components/SiderBar/sidebar.tsx";
import Starfield from "@/layouts/background.tsx";
import {HeroUIProvider,} from "@heroui/system";
import {ToastProvider} from "@heroui/toast";


function DefaultLayout({children}: { children: ReactNode }) {
    return (
        <div className="flex h-screen relative overflow-hidden">
            <Starfield
                starCount={1000}
                starColor={[255, 255, 255]}
                speedFactor={0.05}
            />

            {/* Sidebar en main content */}
            <div className="flex h-full w-full relative z-10">
                <GameLauncherSidebar/>
                <main className="dark text-foreground flex-1 overflow-auto relative z-10">
                    <HeroUIProvider>
                        <ToastProvider/>
                        {children}
                    </HeroUIProvider>
                </main>
            </div>
        </div>
    );
}
export default DefaultLayout;