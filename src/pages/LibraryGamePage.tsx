import {useNavigate, useParams} from "react-router-dom";
import {Button} from "@heroui/button";
import {ArrowLeft} from "lucide-react";
import {useStartSinglePlayerGame} from "@/hooks/useLobbies";
import {useGameStatistics} from "@/hooks/useAnalytics";
import {GameInfoSection} from "@/components/library/game/GameInfoSection.tsx";
import {GameStatisticsCard} from "@/components/library/game/GameStatisticsCard.tsx";
import {GameDetailsTabs} from "@/components/library/game/GameDetailsTabs.tsx";
import {GameImageCard} from "@/components/library/game/GameImageCard.tsx";
import {useGame} from "@/hooks/useGames.ts";

export default function LibraryGamePage() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    const { game, isLoading, isError } = useGame(gameId ?? "");
    const { startSinglePlayer, isPending, isError: startError } = useStartSinglePlayerGame();


    const { gameStatistics, isLoading: isStatsLoading } = useGameStatistics(
        gameId ?? ""
    );

    const handleStart = async () => {
        if (!game) return;
        const res = await startSinglePlayer(game.id);
        if (!startError) window.open(res.launchUrl, "_blank");
    };

    if (isLoading) return <div>Skeleton…</div>;
    if (isError || !game) return <div>Game not found</div>;

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1400px] mx-auto">
                <Button
                    startContent={<ArrowLeft size={20} />}
                    variant="light"
                    className="mb-8"
                    onPress={() => navigate("/library")}
                >
                    Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-4">
                    <GameImageCard title={game.title} imageUrl={game.imageUrl} />

                    <div>
                        <GameInfoSection
                            title={game.title}
                            description={game.description}
                            isPending={isPending}
                            onStart={handleStart}
                        />

                        <div className="mt-6">
                            <GameStatisticsCard
                                stats={
                                    gameStatistics || {
                                        totalPlayTimeMinutes: 0,
                                        winnerRecords: [],
                                    }
                                }
                                isLoading={isStatsLoading}
                            />
                        </div>
                    </div>
                </div>

                <GameDetailsTabs game={game}/>
            </div>
        </div>
    );
}
