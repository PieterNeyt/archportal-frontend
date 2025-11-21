// DefaultLayout.tsx
import {ReactNode} from "react";

export default function DefaultLayout({children}: { children: ReactNode }) {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div
                className={`w-full h-full overflow-auto transition-all duration-300 pl-16`}>
                <div className="max-w-7xl mx-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}