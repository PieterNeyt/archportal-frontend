import {useGameStudio} from "@/hooks/useGameStudio.ts";
import {useGameFromStudio} from "@/hooks/useGame.ts";
import {Gamepad2, Plus} from "lucide-react"; // Plus icon toegevoegd
import {StudioLoadError} from "@/components/gamestudio/StudioLoadError.tsx";
import {GamesList} from "@/components/gamestudio/GamesList.tsx";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {GameStudioInfoCard} from "@/components/gamestudio/GameStudioInfoCard.tsx";
import {GameStudioPageSkeleton} from "@/components/gamestudio/GameStudioPageSkeleton.tsx";
import {Button} from "@heroui/button"; // Button import
import {useNavigate} from "react-router-dom"; // Navigate import (zie notitie onderaan als je Next.js gebruikt)

export function GameStudioPage() {
    const navigate = useNavigate(); // Hook initialiseren

    const {
        isLoading: isStudioLoading,
        isError: isStudioError,
        gameStudio
    } = useGameStudio();

    const {
        isLoading: isGamesLoading,
        isError: isGamesError,
        games
    } = useGameFromStudio();

    if (isStudioLoading || isGamesLoading)
        return <GameStudioPageSkeleton/>

    if (isStudioError || isGamesError || !gameStudio)
        return <StudioLoadError/>

    return (
        <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 animate-appearance-in">
            <section className={`${GLASS_CARD_STYLES} p-6 sm:p-8 relative overflow-hidden group`}>
                <GameStudioInfoCard gameStudio={gameStudio}/>
            </section>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Gamepad2 className="text-primary" size={24}/>
                        <h2 className="text-2xl font-bold text-white">Published Games</h2>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-white/60">
                            {games ? games.length : 0}
                        </span>
                    </div>

                    <Button
                        color="primary"
                        endContent={<Plus size={20}/>}
                        onPress={() => navigate("/game/create")}
                        className="font-semibold shadow-lg shadow-primary/20"
                    >
                        Create Game
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    <GamesList games={games}/>
                </div>
            </section>
        </div>
    );
}