import {ReactNode} from "react";
import {GameLauncherSidebar as SidebarExample} from "@/components/SiderBar/sidebar.tsx";

function DefaultLayout({children}: { children: ReactNode }) {
    return (
        <div className="flex h-screen relative overflow-hidden">
            {/* SPACE BACKGROUND - ALWAYS PRESENT */}
            <div className="absolute inset-0 z-0">
                {/* BASE GRADIENT */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-purple-950/95 via-indigo-950/95 to-blue-950/95"/>

                {/* STARS */}
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-white rounded-full animate-pulse"/>
                    <div className="absolute top-[30%] left-[60%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '0.75s'}}/>
                    <div className="absolute top-[50%] left-[40%] w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '1.5s'}}/>
                    <div className="absolute top-[70%] left-[80%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '3s'}}/>
                    <div className="absolute top-[15%] right-[15%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '5s'}}/>
                    <div className="absolute bottom-[20%] left-[10%] w-2 h-2 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '7s'}}/>
                    <div className="absolute top-[60%] right-[30%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '10s'}}/>
                    <div className="absolute bottom-[40%] right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '2s'}}/>
                    <div className="absolute top-[25%] left-[45%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '4s'}}/>
                    <div className="absolute bottom-[15%] right-[45%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '6s'}}/>
                    <div className="absolute top-[80%] left-[70%] w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '8s'}}/>
                    <div className="absolute top-[5%] right-[40%] w-1 h-1 bg-white rounded-full animate-pulse"
                         style={{animationDelay: '9s'}}/>
                </div>

                {/* NEBULA EFFECTS */}
                <div
                    className="absolute top-[15%] left-[5%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-nebula-drift"/>
                <div
                    className="absolute bottom-[5%] right-[10%] w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-nebula-drift-reverse"/>
                <div
                    className="absolute top-[45%] left-[45%] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-nebula-pulse"/>
                <div
                    className="absolute top-[60%] right-[5%] w-72 h-72 bg-violet-500/12 rounded-full blur-3xl animate-nebula-drift"
                    style={{animationDelay: '5s'}}/>
                <div
                    className="absolute bottom-[30%] left-[25%] w-56 h-56 bg-cyan-500/8 rounded-full blur-3xl animate-nebula-pulse"
                    style={{animationDelay: '3s'}}/>
            </div>

            {/* SIDEBAR */}
            <div className="relative z-10">
                <SidebarExample/>
            </div>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-auto relative z-10">
                {children}
            </main>

            {/* OPTIONAL: SCAN LINE EFFECT */}
            <div className="absolute inset-0 pointer-events-none z-20 opacity-5">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent h-32 animate-scan-line"/>
            </div>

            <style>{`
                @keyframes nebula-drift {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, 20px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 30px) scale(0.95);
                    }
                }

                @keyframes nebula-drift-reverse {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(-30px, -20px) scale(1.05);
                    }
                    66% {
                        transform: translate(20px, -30px) scale(0.98);
                    }
                }

                @keyframes nebula-pulse {
                    0%, 100% {
                        opacity: 0.1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.15;
                        transform: scale(1.1);
                    }
                }

                @keyframes scan-line {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100vh);
                    }
                }

                .animate-nebula-drift {
                    animation: nebula-drift 30s ease-in-out infinite;
                }

                .animate-nebula-drift-reverse {
                    animation: nebula-drift-reverse 35s ease-in-out infinite;
                }

                .animate-nebula-pulse {
                    animation: nebula-pulse 20s ease-in-out infinite;
                }

                .animate-scan-line {
                    animation: scan-line 8s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default DefaultLayout;