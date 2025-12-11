import {useState} from "react";
import {useParams} from "react-router-dom";
import {Button} from "@heroui/button";
import {Card, CardBody} from "@heroui/card";
import {Spinner} from "@heroui/spinner";
import {Gamepad2, Plus, Users} from "lucide-react";
import {useGetAllLobbies, useJoinMultiplayerLobby} from "@/hooks/useLobbies";
import {EmptyTab} from "@/components/library/game/EmptyTab.tsx";
import {CreateLobbyModal} from "@/components/library/game/CreateLobbyModal.tsx";
import {Game} from "@/model/game.ts";

interface LobbiesTabProps {
    game: Game;
}

export function LobbiesTabContent({game}: LobbiesTabProps) {
    const {gameId} = useParams();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const {data: lobbiesData, isLoading: isLoadingLobbies} = useGetAllLobbies(gameId ?? "");
    const {joinLobby, isPending: isJoining} = useJoinMultiplayerLobby();

    const lobbies = lobbiesData?.lobbies ?? [];

    const handleJoinLobby = async (lobbyId: string) => {
        await joinLobby(lobbyId);
    };

    const handleDirectJoin = async (lobbyId: string) => {
        await handleJoinLobby(lobbyId);
    };

    if (isLoadingLobbies) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner size="lg" color="primary"/>
            </div>
        );
    }

    return (
        <div className="py-4 space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                    <h3 className="text-xl font-bold text-white">Multiplayer Lobbies</h3>
                    <p className="text-white/50 text-xs mt-0.5">Join a game or start your own</p>
                </div>
                <Button
                    color="primary"
                    size="md"
                    className="font-semibold shadow-lg shadow-primary/20"
                    startContent={<Plus size={18}/>}
                    onPress={() => setIsCreateModalOpen(true)}
                >
                    Create Lobby
                </Button>
            </div>

            {lobbies.length === 0 ? (
                <EmptyTab
                    icon={<Gamepad2 size={48} className="text-white/20 mx-auto mb-4"/>}
                    title="No lobbies available"
                    subtitle="Create one to start playing!"
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lobbies.map((lobby) => (
                        <Card
                            key={lobby.id}
                            isPressable
                            isHoverable
                            className="bg-black/20 border border-white/10 hover:bg-black/40 transition-all w-full text-left"
                        >
                            <CardBody className="p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3 rounded-xl border border-white/5 shrink-0">
                                            <Gamepad2 size={24} className="text-white"/>
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-lg font-bold text-white truncate pr-2">
                                                COME AND PLAY BTICHES
                                            </h4>

                                            <div className="flex items-center gap-3 text-xs mt-1">
                                                <div
                                                    className="flex items-center gap-1.5 text-white/60 bg-white/5 px-2 py-0.5 rounded-full">
                                                    <Users size={12}/>
                                                    <span>{lobby.currentPlayers} / {lobby.maxPlayers}</span>
                                                </div>

                                                <span
                                                    className={`px-2 py-0.5 rounded-full font-medium tracking-wide uppercase ${
                                                        lobby.status === "WAITING"
                                                            ? "text-green-400"
                                                            : "text-orange-400"
                                                    }`}>
                                                    {lobby.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        size="sm"
                                        color="primary"
                                        variant={lobby.status === "WAITING" ? "solid" : "flat"}
                                        className="font-semibold shrink-0"
                                        onPress={() => handleDirectJoin(lobby.id)}
                                        isDisabled={lobby.status !== "WAITING"}
                                        isLoading={isJoining}
                                    >
                                        JOIN
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

            <CreateLobbyModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                gameId={gameId ?? ""}
                maxlobbysize={game.maxlobbysize}
            />
        </div>
    );
}