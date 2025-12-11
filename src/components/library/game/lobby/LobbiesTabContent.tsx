import {useParams} from "react-router-dom";
import {Button} from "@heroui/button";
import {Spinner} from "@heroui/spinner";
import {AlertCircle, Gamepad2, Plus} from "lucide-react";
import {
    useGetAllLobbies,
    useIsPLayerInLobby,
    useJoinMultiplayerLobby,
    useStartMultiplayerLobby
} from "@/hooks/useLobbies.ts";
import {EmptyTab} from "@/components/library/game/EmptyTab.tsx";
import {Game} from "@/model/game.ts";
import {InLobbyCard} from "@/components/library/game/lobby/inLobbyCard.tsx";
import {LobbiesListCard} from "@/components/library/game/lobby/LobbiesTabList.tsx";

interface LobbiesTabProps {
    game: Game;
}

export function LobbiesTabContent({game}: LobbiesTabProps) {
    const {gameId} = useParams();
    const { startLobby, isPending } = useStartMultiplayerLobby();

    const onSubmit = async () => {
        await startLobby({gameId: game.id});
    };

    const {
        lobbies: lobbiesData,
        isLoading: isLoadingLobbies,
        isError: isLobbiesError
    } = useGetAllLobbies(gameId ?? "");

    const {
        isInLobby,
        isLoading: isCheckingLobby,
        isError: isCheckError
    } = useIsPLayerInLobby();

    const {joinLobby, isPending: isJoining} = useJoinMultiplayerLobby();

    const lobbies = lobbiesData?.lobbies ?? [];

    const handleJoinLobby = async (lobbyId: string) => {
        await joinLobby(lobbyId);
    };

    if (isLoadingLobbies || isCheckingLobby) {
        return (
            <div className="flex items-center justify-center py-12">
                <Spinner size="lg" color="primary"/>
            </div>
        );
    }

    if (isLobbiesError || isCheckError) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white">Something went wrong</h3>
                <p className="text-white/50">Could not load lobbies.</p>
            </div>
        );
    }

    if (isInLobby?.isPlayerInLobby) {
        return (
            <div className="py-4">
                <InLobbyCard lobbyId={isInLobby.lobbyId!} />
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
                    onPress={onSubmit}
                    disabled={isPending}
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
                        <LobbiesListCard
                            key={lobby.lobbyId}
                            lobby={lobby}
                            isJoined={isJoining}
                            handleJoin={() => handleJoinLobby(lobby.lobbyId)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}