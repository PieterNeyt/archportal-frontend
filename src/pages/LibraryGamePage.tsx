import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { Image } from "@heroui/image";
import { ArrowLeft, Play, Gamepad2, Clock, Trophy, Target, Zap } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { useStartSinglePlayerGame } from "@/hooks/useLobbies.ts";
import { useGameStatistics } from "@/hooks/useAnalytics";
import { SinglePlayerLaunchResponse } from "@/model/SinglePlayerLaunchResponse.ts";

export default function LibraryGamePage() {
    const { gameId } = useParams<{ gameId: string }>();
    const navigate = useNavigate();
    const { isLoading, isError, games } = useLibrary();
    const { isPending, isError: isStartError, startSinglePlayer } = useStartSinglePlayerGame();
    const [imageFailed, setImageFailed] = useState(false);

    // Haal het profiel ID op (pas dit aan naar jouw authenticatie logica)
    const profileId = "56c1596a-ec26-4c5d-aa01-31f7a34b76ad"; // TODO: Vervang dit met echte profile ID van useAuth() of context

    const { gameStatistics, isLoading: isStatsLoading } = useGameStatistics(
        profileId,
        gameId || ""
    );

    const game = games?.find(g => g.id === gameId);

    const handleStartGame = async () => {
        if (!game) return;

        const response: SinglePlayerLaunchResponse = await startSinglePlayer(game.id);
        if (!isStartError) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
            return;
        }
        return alert("Er is een fout opgetreden bij het starten van het spel.");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 w-32 bg-white/10 rounded mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="h-96 bg-white/10 rounded-xl"></div>
                            <div className="space-y-4">
                                <div className="h-12 bg-white/10 rounded"></div>
                                <div className="h-32 bg-white/10 rounded"></div>
                                <div className="h-12 bg-white/10 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !game) {
        return (
            <div className="min-h-screen p-6">
                <div className="max-w-[1400px] mx-auto">
                    <Button
                        startContent={<ArrowLeft size={20} />}
                        variant="light"
                        className="mb-8 text-white/80"
                        onPress={() => navigate("/library")}
                    >
                        Terug naar Library
                    </Button>
                    <div className="text-center py-20">
                        <Gamepad2 size={64} className="text-white/40 mx-auto mb-4" />
                        <p className="text-white/60 text-xl">Game niet gevonden</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-[1400px] mx-auto">
                {/* Back Button */}
                <Button
                    startContent={<ArrowLeft size={20} />}
                    variant="light"
                    className="mb-8 text-white/80 hover:text-white"
                    onPress={() => navigate("/library")}
                >
                    Terug naar Library
                </Button>

                {/* Game Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Image Section */}
                    <Card className="bg-black/30 backdrop-blur-xl border border-white/10 overflow-hidden">
                        <CardBody className="p-0">
                            <div className="aspect-video relative overflow-hidden">
                                {(imageFailed || !game.imageUrl) ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                                        <Gamepad2 size={96} className="text-white/40 mb-4" />
                                        <p className="text-white/40">Geen afbeelding</p>
                                    </div>
                                ) : (
                                    <Image
                                        alt={game.title}
                                        className="object-cover w-full h-full"
                                        src={game.imageUrl}
                                        onError={() => setImageFailed(true)}
                                        removeWrapper
                                    />
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Info Section */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent pb-2">
                                {game.title}
                            </h1>
                            <p className="text-white/70 text-lg leading-relaxed">
                                {game.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                color="primary"
                                size="lg"
                                startContent={<Play size={20} />}
                                className="font-semibold flex-1"
                                isLoading={isPending}
                                onPress={handleStartGame}
                            >
                                Speel Nu
                            </Button>
                        </div>

                        {/* Game Statistics Card */}
                        <Card className="bg-black/30 backdrop-blur-xl border border-white/10">
                            <CardBody className="p-6">
                                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                                    <Trophy size={24} className="text-purple-400" />
                                    Jouw Statistieken
                                </h3>

                                {isStatsLoading ? (
                                    <div className="space-y-3 animate-pulse">
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-12 bg-white/5 rounded"></div>
                                        ))}
                                    </div>
                                ) : gameStatistics ? (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock size={18} className="text-blue-400" />
                                                <span className="text-white/60 text-sm">Playtime</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">
                                                {Math.round(gameStatistics.totalPlayTimeMinutes / 60)}u
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target size={18} className="text-green-400" />
                                                <span className="text-white/60 text-sm">Games Played</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">
                                                {gameStatistics.winnerRecords.length}
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Trophy size={18} className="text-yellow-400" />
                                                <span className="text-white/60 text-sm">Most Recent Winner</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">
                                                {gameStatistics.winnerRecords
                                                    .sort((a, b) => new Date(b.PlayedAt).getTime() - new Date(a.PlayedAt).getTime())
                                                    [0]
                                                    .Winner}
                                            </p>
                                        </div>

                                        {/*<div className="bg-white/5 rounded-lg p-4 border border-white/10">*/}
                                        {/*    <div className="flex items-center gap-2 mb-2">*/}
                                        {/*        <Zap size={18} className="text-purple-400" />*/}
                                        {/*        <span className="text-white/60 text-sm">Win Rate</span>*/}
                                        {/*    </div>*/}
                                        {/*    <p className="text-2xl font-bold text-white">*/}
                                        {/*        {gameStatistics.gamesPlayed > 0*/}
                                        {/*            ? Math.round((gameStatistics.gamesWon / gameStatistics.gamesPlayed) * 100)*/}
                                        {/*            : 0}%*/}
                                        {/*    </p>*/}
                                        {/*</div>*/}
                                    </div>
                                ) : (
                                    <p className="text-white/60 text-center py-4">
                                        Geen statistieken beschikbaar
                                    </p>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>

                {/* Tabs Section */}
                <Card className="bg-black/30 backdrop-blur-xl border border-white/10">
                    <CardBody className="p-6">
                        <Tabs
                            aria-label="Game details tabs"
                            color="primary"
                            variant="underlined"
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-white/10",
                                cursor: "w-full bg-purple-500",
                                tab: "max-w-fit px-0 h-12",
                                tabContent: "group-data-[selected=true]:text-white text-white/60"
                            }}
                        >
                            <Tab
                                key="achievements"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Trophy size={18} />
                                        <span>Achievements</span>
                                    </div>
                                }
                            >
                                <div className="py-6">
                                    <div className="text-center py-12">
                                        <Trophy size={48} className="text-white/40 mx-auto mb-4" />
                                        <p className="text-white/60 text-lg mb-2">
                                            Achievements komen binnenkort
                                        </p>
                                        <p className="text-white/40 text-sm">
                                            Unlock speciale beloningen door uitdagingen te voltooien
                                        </p>
                                    </div>
                                </div>
                            </Tab>

                            <Tab
                                key="lobbies"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Gamepad2 size={18} />
                                        <span>Lobbies</span>
                                    </div>
                                }
                            >
                                <div className="py-6">
                                    <div className="text-center py-12">
                                        <Gamepad2 size={48} className="text-white/40 mx-auto mb-4" />
                                        <p className="text-white/60 text-lg mb-2">
                                            Lobby geschiedenis komt binnenkort
                                        </p>
                                        <p className="text-white/40 text-sm">
                                            Bekijk je recente games en match geschiedenis
                                        </p>
                                    </div>
                                </div>
                            </Tab>

                            <Tab
                                key="posts"
                                title={
                                    <div className="flex items-center gap-2">
                                        <Zap size={18} />
                                        <span>Developer Posts</span>
                                    </div>
                                }
                            >
                                <div className="py-6">
                                    <div className="text-center py-12">
                                        <Zap size={48} className="text-white/40 mx-auto mb-4" />
                                        <p className="text-white/60 text-lg mb-2">
                                            Developer updates komen binnenkort
                                        </p>
                                        <p className="text-white/40 text-sm">
                                            Blijf op de hoogte van de laatste nieuwtjes en updates
                                        </p>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}