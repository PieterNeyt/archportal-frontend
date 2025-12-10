import {Button} from "@heroui/button";
import {AlertCircle, ArrowLeft} from "lucide-react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {useNavigate} from "react-router-dom";


export function GameLoadError() {
    const navigate = useNavigate();

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Button
                variant="flat"
                className="mb-4 bg-white/5 hover:bg-white/10 text-white"
                startContent={<ArrowLeft size={20}/>}
                onPress={() => navigate("/gamestudio")}
            >
                Return to Game Studio
            </Button>
            <div
                className={`${GLASS_CARD_STYLES} p-12 flex flex-col items-center justify-center text-white/40 gap-4`}>
                <AlertCircle size={48} className="text-danger"/>
                <h2 className="text-xl font-bold text-white">Game not found</h2>
                <p>Could not load game data. Please try again later.</p>
            </div>
        </div>)
}