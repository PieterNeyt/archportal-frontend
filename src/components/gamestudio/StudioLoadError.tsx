import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@heroui/button";

export function StudioLoadError() {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto min-h-[400px] p-8 rounded-3xl border border-white/5 bg-black/20 backdrop-blur-md animate-appearance-in">
            <div className="mb-6 relative">
                <div className="absolute inset-0 bg-danger/20 blur-xl rounded-full" />
                <div className="relative p-6 rounded-full bg-danger/10 border border-danger/20">
                    <AlertTriangle size={48} className="text-danger" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2 text-center">
                Unable to load Studio Data
            </h2>
            <p className="text-white/50 text-center max-w-md mb-8">
                We encountered an error while fetching the game studio details or games.
                This could be due to a connection issue or the server being temporarily unavailable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    color="danger"
                    variant="shadow"
                    startContent={<RefreshCcw size={18} />}
                    onPress={() => window.location.reload()}
                    className="font-medium shadow-lg shadow-danger/20"
                >
                    Try Again
                </Button>
            </div>
        </div>
    );
}