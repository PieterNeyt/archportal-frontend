import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Spinner } from "@heroui/spinner";
import { Gamepad2, Users, Plus, ArrowLeft, Crown } from "lucide-react";
import {
    useGetAllLobbies,
    useGetLobbyInfo,
    useJoinMultiplayerLobby
} from "@/hooks/useLobbies";
import { EmptyTab } from "@/components/library/game/EmptyTab.tsx";
import { CreateLobbyModal } from "@/components/library/game/CreateLobbyModal.tsx";

export function LobbiesTabContent() {
    const { gameId } = useParams();
    const [selectedLobbyId, setSelectedLobbyId] = useState<string | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const { data: lobbiesData, isLoading: isLoadingLobbies } = useGetAllLobbies(gameId ?? "");
    const { data: lobbyInfo, isLoading: isLoadingLobbyInfo } = useGetLobbyInfo(selectedLobbyId ?? "");
    const { joinLobby, isPending: isJoining } = useJoinMultiplayerLobby();

    const lobbies = lobbiesData?.lobbies ?? [];

    const handleJoinLobby = async () => {
        if (!selectedLobbyId) return;
        try {
            await joinLobby(selectedLobbyId);
        } catch (error) {
            console.error("Failed to join lobby:", error);
        }
    };

    const handleBackToList = () => {
        setSelectedLobbyId(null);
    };

    // Loading state
    if (isLoadingLobbies) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner size="lg" color="primary" />
            </div>
        );
    }

    // Show lobby details view
    if (selectedLobbyId && lobbyInfo) {
        return (
            <div className="py-6">
                <Button
                    startContent={<ArrowLeft size={18} />}
                    variant="light"
                    className="mb-6"
                    onPress={handleBackToList}
                >
                    Back to lobbies
                </Button>

                <Card className="bg-black/20 border border-white/10">
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {lobbyInfo.lobbyId}
                                </h3>
                                <p className="text-white/60">
                                    {lobbyInfo.players.length} / {lobbyInfo.maxPlayers} players
                                </p>
                            </div>
                            <Button
                                color="primary"
                                size="lg"
                                onPress={handleJoinLobby}
                                isLoading={isJoining}
                                isDisabled={
                                    lobbyInfo.players.length >= lobbyInfo.maxPlayers ||
                                    lobbyInfo.status !== "WAITING"
                                }
                            >
                                {lobbyInfo.status === "WAITING" ? "Join Lobby" : "Game Started"}
                            </Button>
                        </div>

                        {isLoadingLobbyInfo ? (
                            <div className="flex items-center justify-center py-8">
                                <Spinner color="primary" />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <h4 className="text-lg font-semibold text-white mb-4">
                                    Players in Lobby
                                </h4>
                                {lobbyInfo.players.map((player, index) => (
                                    <Card key={player.playerId} className="bg-white/5 border border-white/10">
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-3">
                                                {index === 0 && (
                                                    <Crown size={20} className="text-yellow-500" />
                                                )}
                                                <Users size={20} className="text-white/60" />
                                                <span className="text-white font-medium">
                                                    {player.username}
                                                </span>
                                                {index === 0 && (
                                                    <span className="text-xs text-yellow-500 ml-auto">
                                                        Host
                                                    </span>
                                                )}
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}

                                {/* Empty slots */}
                                {Array.from({
                                    length: lobbyInfo.maxPlayers - lobbyInfo.players.length
                                }).map((_, index) => (
                                    <Card
                                        key={`empty-${index}`}
                                        className="bg-white/5 border border-dashed border-white/20"
                                    >
                                        <CardBody className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Users size={20} className="text-white/30" />
                                                <span className="text-white/30 font-medium">
                                                    Waiting for player...
                                                </span>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        );
    }

    // Show lobbies list view
    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Available Lobbies</h3>
                <Button
                    color="primary"
                    startContent={<Plus size={18} />}
                    onPress={() => setIsCreateModalOpen(true)}
                >
                    Create Lobby
                </Button>
            </div>

            {lobbies.length === 0 ? (
                <EmptyTab
                    icon={<Gamepad2 size={48} className="text-white/40 mx-auto mb-4" />}
                    title="No lobbies available"
                    subtitle="Be the first to create a lobby and invite others to play"
                />
            ) : (
                <div className="space-y-3">
                    {lobbies.map((lobby) => (
                        <Card
                            key={lobby.id}
                            isPressable
                            onPress={() => setSelectedLobbyId(lobby.id)}
                            className="bg-black/20 border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
                        >
                            <CardBody className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-purple-500/20 p-3 rounded-lg">
                                            <Gamepad2 size={24} className="text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-1">
                                                {lobby.id}
                                            </h4>
                                            <div className="flex items-center gap-4 text-sm text-white/60">
                                                <span className="flex items-center gap-1">
                                                    <Users size={14} />
                                                    {lobby.currentPlayers} / {lobby.maxPlayers}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                                    lobby.status === "WAITING"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-orange-500/20 text-orange-400"
                                                }`}>
                                                    {lobby.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="flat"
                                        color="primary"
                                    >
                                        View Details
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
            />
        </div>
    );
}