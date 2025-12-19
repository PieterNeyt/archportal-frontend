import {AlertCircle, RefreshCcw} from "lucide-react";
import {Button} from "@heroui/button";
import {useNavigate} from "react-router-dom";

interface PageError {
    title: string;
    message: string;
    refresh: () => void;
}

export default function PageError({title, message, refresh}: PageError) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div
                className="max-w-md w-full p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center shadow-2xl">
                <div className="inline-flex p-4 rounded-full bg-red-500/10 mb-6">
                    <AlertCircle size={40} className="text-red-500"/>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                <p className="text-white/50 mb-8">{message}</p>

                <div className="flex flex-col gap-3">
                    <Button
                        color="primary"
                        variant="shadow"
                        onPress={refresh}
                        startContent={<RefreshCcw size={18}/>}
                    >
                        Retry Connection
                    </Button>
                    <Button
                        variant="light"
                        className="text-white/40"
                        onPress={() => navigate("/")}
                    >
                        Back to shop
                    </Button>
                </div>
            </div>
        </div>
    );
}