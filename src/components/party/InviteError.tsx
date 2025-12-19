import {AlertCircle, RefreshCcw} from "lucide-react";
import {Button} from "@heroui/button";

interface InviteErrorProps {
    onRetry: () => void;
}

export default function InviteError({onRetry}: InviteErrorProps) {
    return (
        <div
            className="flex flex-col items-center justify-center p-10 text-center border border-dashed border-red-500/20 rounded-2xl bg-red-500/5">
            <div className="p-3 bg-red-500/10 rounded-full mb-4">
                <AlertCircle className="text-red-400" size={32}/>
            </div>
            <h3 className="text-white font-semibold">Couldn't load invites</h3>
            <p className="text-white/50 text-sm mb-4">Something went wrong on our end.</p>
            <Button
                variant="flat"
                color="danger"
                size="sm"
                startContent={<RefreshCcw size={16}/>}
                onPress={onRetry}
            >
                Try Again
            </Button>
        </div>
    );
}