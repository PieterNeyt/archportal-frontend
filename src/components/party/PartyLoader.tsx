import {Gamepad2} from "lucide-react";

export default function PartyLoader() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"/>
                <div className="relative p-5 rounded-full border border-white/10">
                    <Gamepad2 size={64} className="text-primary animate-pulse"/>
                </div>
            </div>
            <p className="text-white/40 font-medium text-sm animate-pulse tracking-widest uppercase">
                Syncing Party State...
            </p>
        </div>
    );
}