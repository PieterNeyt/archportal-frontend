import {ReactNode} from "react";
import {GameLauncherSidebar as SidebarExample} from "@/components/SiderBar/sidebar.tsx";

function DefaultLayout({children}: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <SidebarExample/>
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}

export default DefaultLayout;