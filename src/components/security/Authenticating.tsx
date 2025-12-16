import {CircularProgress} from "@heroui/progress";
import {Lock} from "lucide-react";

export default function Authenticating() {
    return (
        <div
            className="flex items-center justify-center min-h-screen text-white p-4"
        >
            <div
                className="flex flex-col items-center justify-center space-y-6 max-w-md w-full p-8 rounded-2xl
                           border border-white/10 shadow-2xl bg-black/40"
            >
                <Lock size={48} className="text-primary animate-pulse"/>
                <h1 className="text-3xl font-bold text-foreground">
                    Authenticating
                </h1>
                <CircularProgress
                    size="lg"
                    aria-label="Loading..."
                    color="primary"
                    isIndeterminate
                    className="mt-4"
                />
                <p className="text-sm text-white/70 text-center">
                    Please wait while we secure your connection and load your profile data.
                </p>
            </div>
        </div>
    );
}