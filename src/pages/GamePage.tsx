import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {Button} from "@heroui/button";
import {ArrowLeft} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import {useGame} from "@/hooks/useGames.ts";
import {GameDevPostCard} from "@/components/game/GameDevPostCard.tsx";
import {GameAchievementsCard} from "@/components/game/GameAchievementsCard.tsx";
import {GameInfoCard} from "@/components/game/GameInfoCard.tsx";
import {GameLoadError} from "@/components/game/GameLoadError.tsx";
import {GamePageLoadSkeleton} from "@/components/game/GamePageLoadSkeleton.tsx";

export function GamePage() {
    const {id} = useParams<{ id: string }>();
    const {isLoading, isError, game} = useGame(id || "");

    const navigate = useNavigate();

    if (isLoading) {
        return <GamePageLoadSkeleton/>;
    }

    if (isError || !game) {
        return <GameLoadError/>
    }

    return (
        <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-6 animate-appearance-in">
            <div>
                <Button
                    variant="flat"
                    className="bg-white/5 hover:bg-white/10 text-white"
                    startContent={<ArrowLeft size={20}/>}
                    onPress={() => navigate("/gamestudio")}
                >
                    Return to Game Studio
                </Button>
            </div>
            <section className={`${GLASS_CARD_STYLES} p-6 sm:p-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full opacity-50 pointer-events-none"/>
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    <GameInfoCard game={game}/>
                </div>
            </section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className={`${GLASS_CARD_STYLES} p-6 relative overflow-hidden flex flex-col h-64`}>
                    <GameDevPostCard/>
                </section>

                <section className={`${GLASS_CARD_STYLES} p-6 relative overflow-hidden flex flex-col h-64`}>
                    <GameAchievementsCard/>
                </section>
            </div>
        </div>
    );
}