import {GameLobbyFace} from "@/model/lobby.ts";
import {Card, CardBody} from "@heroui/card";
import {Gamepad2, Users} from "lucide-react";
import {Button} from "@heroui/button";

interface LobbiesTabListProps {
    lobby:GameLobbyFace
    isJoined:boolean;
    handleJoin: () => void
}

export function LobbiesListCard({lobby,isJoined,handleJoin}: LobbiesTabListProps) {
        const isFull = lobby.currentPlayers >= lobby.maxPlayers;

        return (
            <Card
                key={lobby.lobbyId}
                isHoverable
                className="bg-black/20 border border-white/10 hover:bg-black/40 transition-all w-full text-left cursor-default"
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
                                    Lobby #{lobby.lobbyId.substring(0, 6)}
                                </h4>

                                <div className="flex items-center gap-3 text-xs mt-1">
                                    <div
                                        className="flex items-center gap-1.5 text-white/60 bg-white/5 px-2 py-0.5 rounded-full">
                                        <Users size={12}/>
                                        <span className={isFull ? "text-red-400 font-bold" : ""}>
                                                            {lobby.currentPlayers} / {lobby.maxPlayers}
                                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isFull ? (
                            <div className="px-4 py-2 font-bold text-red-500 text-sm tracking-widest opacity-80">
                                FULL
                            </div>
                        ) : (
                            <Button
                                size="sm"
                                color="primary"
                                variant={lobby.status === "WAITING" ? "solid" : "flat"}
                                className="font-semibold shrink-0"
                                onPress={handleJoin}
                                isLoading={isJoined}
                            >
                                JOIN
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        );
}