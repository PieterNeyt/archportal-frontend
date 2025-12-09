import { useState } from "react";
import {GameStudio} from "@/model/GameStudio.ts";
import {CreditCard, Edit, Hash} from "lucide-react";
import {Button} from "@heroui/button";
import {UpdateGameStudioModal} from "@/components/gamestudio/UpdateGameStudioModal.tsx";

export interface GameStudioInfoProps {
    gameStudio: GameStudio;
}

export function GameStudioInfoCard({gameStudio}: GameStudioInfoProps) {

    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleEditStudio = () => {
        setIsEditOpen(true);
    };

    return (
        <>
            <div
                className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full opacity-50 pointer-events-none"
            />

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 relative z-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        {gameStudio.name}
                    </h1>
                    <div className="flex items-center gap-2 text-white/50 mt-2 text-sm">
                        <Hash size={14}/>
                        <span className="font-mono">{gameStudio.id}</span>
                    </div>
                </div>

                <Button
                    color="primary"
                    variant="flat"
                    startContent={<Edit size={18}/>}
                    onPress={handleEditStudio}
                    className="font-medium"
                >
                    Edit Studio
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 border-t border-white/10 pt-6">
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">About</h3>
                    <p className="text-white/80 leading-relaxed">
                        {gameStudio.description}
                    </p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider flex items-center gap-2">
                        <CreditCard size={14}/> Banking Details
                    </h3>
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                        <p className="font-mono text-white/90 text-lg tracking-wide">
                            {gameStudio.IBAN}
                        </p>
                    </div>
                </div>
            </div>

            <UpdateGameStudioModal
                isOpen={isEditOpen}
                onOpenChange={setIsEditOpen}
                gameStudio={gameStudio}
            />
        </>
    );
}
