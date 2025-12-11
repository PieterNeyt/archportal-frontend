import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {Avatar} from "@heroui/avatar";
import {Spinner} from "@heroui/spinner";
import {Chip} from "@heroui/chip";
import {AlertCircle, Loader2, LogOut, Play} from "lucide-react";
import {useGetLobbyInfo, useGetMySession, useStartMultiplayerGame} from "@/hooks/useLobbies.ts";
import {SinglePlayerLaunchResponse} from "@/model/SinglePlayerLaunchResponse.ts";
import {useEffect} from "react";

interface InLobbyCardProps {
    lobbyId: string;
}

export function InLobbyCard({lobbyId}: InLobbyCardProps) {
    const {isError, isLoading, lobby} = useGetLobbyInfo(lobbyId);
    const {isPending, isError: isGameError, startMultiplayer} = useStartMultiplayerGame();
    const { mySession, refetch: getMySessionData  } = useGetMySession(lobbyId);

    useEffect(() => {
        if (!lobby) return;

        // Wanneer host start -> status = CLOSED of STARTED
        if (lobby.status === "CLOSED" || lobby.status === "STARTED") {
            // Trigger de sessie fetch van de hook
            getMySessionData()
        }
    }, [lobby, getMySessionData]);


    useEffect(() => {
        if (lobby && (lobby.status === "CLOSED" || lobby.status === "STARTED") && mySession) {
            // redirect
            window.open(mySession.launchUrl, "_blank");
        }
        // Luister naar zowel lobby status als de mySession data
    }, [lobby, mySession]);

    const handleLeaveLobby = () => {
        console.log("Leaving lobby:", lobbyId);
        // TODO: Implement leave logic
    };

    const handleStartGame = async () => {
        const response: SinglePlayerLaunchResponse = await startMultiplayer(lobbyId);

        if (!isGameError) {
            window.open(response.launchUrl, "_blank", "noopener,noreferrer");
            return;
        }
        return alert("There was an error launching the game.");

    };

    if (isLoading) {
        return (
            <Card className="w-full h-[400px] bg-black/20 border border-white/10 flex items-center justify-center">
                <Spinner label="Syncing lobby data..." color="primary" size="lg"/>
            </Card>
        );
    }

    if (isError || !lobby) {
        return (
            <Card className="w-full bg-danger/10 border border-danger/20">
                <CardBody className="p-8 flex flex-col items-center text-center gap-4">
                    <AlertCircle size={48} className="text-danger"/>
                    <div>
                        <h3 className="text-xl font-bold text-white">Connection Error</h3>
                        <p className="text-white/50">Could not retrieve lobby details.</p>
                    </div>
                    <Button
                        color="danger"
                        variant="flat"
                        onPress={handleLeaveLobby}
                    >
                        Leave Lobby
                    </Button>
                </CardBody>
            </Card>
        );
    }

    const filledSlots = lobby.players.length;
    const totalSlots = lobby.maxPlayers;
    const emptySlots = Math.max(0, totalSlots - filledSlots);

    return (
        <Card className="w-full bg-black/20 border border-white/10 overflow-visible">
            {/* --- HEADER --- */}
            <CardHeader className="flex justify-between items-center p-6 pb-2 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Button
                        isIconOnly
                        variant="flat"
                        color="danger"
                        size="sm"
                        aria-label="Leave Lobby"
                        onPress={handleLeaveLobby}
                        className="bg-danger/10 text-danger hover:bg-danger/20"
                    >
                        <LogOut size={18}/>
                    </Button>

                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold text-white tracking-wide uppercase">
                            Lobby Room <span className="text-white/50 ml-1">#{lobbyId.substring(0, 6)}</span>
                        </h2>
                        <Chip
                            size="sm"
                            variant="flat"
                            color={lobby.status === "WAITING" ? "success" : "warning"}
                            className="border-none"
                        >
                            {lobby.status}
                        </Chip>
                    </div>
                </div>
                <div className="text-white/40 text-sm font-mono">
                    {filledSlots} / {totalSlots} Players
                </div>
            </CardHeader>

            <CardBody className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {lobby.players.map((player) => (
                        <Card
                            key={player.gamerTag}
                            className="bg-white/5 border border-white/10 hover:border-primary/50 transition-all group"
                        >
                            <CardBody className="flex flex-row items-center justify-start p-3 gap-4">
                                <Avatar
                                    src={`${player.avatarUrl}`}
                                    name={player.gamerTag}
                                    className="w-12 h-12 text-large border-2 border-primary/50 shrink-0"
                                    isBordered
                                    color="primary"
                                />
                                <div className="flex flex-col items-start min-w-0">
                                    <h3 className="font-bold text-white text-md truncate w-full">
                                        {player.gamerTag}
                                    </h3>
                                    <span className="text-[10px] text-primary uppercase font-bold tracking-wider">
                                        READY
                                    </span>
                                </div>
                            </CardBody>
                        </Card>
                    ))}

                    {[...Array(emptySlots)].map((_, index) => (
                        <Card
                            key={`empty-${index}`}
                            className="bg-transparent border border-dashed border-white/10 shadow-none"
                        >
                            <CardBody className="flex flex-row items-center justify-start p-3 gap-4 opacity-50">
                                <div
                                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                    <Loader2 size={20} className="text-white/50 animate-spin"/>
                                </div>
                                <div className="flex flex-col items-start">
                                    <h3 className="font-medium text-white/50 italic text-sm">
                                        Empty Slot
                                    </h3>
                                    <span className="text-[10px] text-white/30 uppercase tracking-widest animate-pulse">
                                        Searching...
                                    </span>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </CardBody>

            <CardFooter className="flex justify-center pb-8 pt-2">
                <Button
                    size="lg"
                    color="primary"
                    variant="shadow"
                    className="font-bold text-lg px-12 py-6 shadow-primary/25 w-full max-w-md"
                    startContent={<Play size={24} fill="currentColor"/>}
                    isLoading={isPending}
                    onPress={handleStartGame}
                >
                    START GAME
                </Button>
            </CardFooter>
        </Card>
    );
}