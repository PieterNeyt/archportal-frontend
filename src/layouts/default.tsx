import {ReactNode} from "react";

import {SideBar} from "@/components/SIdeBar.tsx";

export default function DefaultLayout({children}: { children: ReactNode }) {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Sidebar - fixed position, always on the left */}
            <SideBar/>

            {/* Main content - full width, padding to account for collapsed sidebar */}
            <div className="w-full h-full overflow-auto pl-16">
                <div className="max-w-7xl mx-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}