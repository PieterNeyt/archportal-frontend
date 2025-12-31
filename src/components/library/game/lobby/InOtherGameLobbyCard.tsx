import {useNavigate} from "react-router-dom";
import {useLeaveLobby} from "@/hooks/useLobbies.ts";
import {Card, CardBody} from "@heroui/react";
import {AlertCircle, ArrowRight, LogOut} from "lucide-react";
import {Button} from "@heroui/button";

interface InOtherGameLobbyCardProps {
    otherGameId: string;
}

export default function InOtherGameLobbyCard({otherGameId}: InOtherGameLobbyCardProps) {
    const navigate = useNavigate();
    const {leaveLobby, isPending} = useLeaveLobby();

    return (
        <Card className={"bg-warning/10 border border-warning/20 shadow-xl"}>
            <CardBody className={"p-8"}>
                <div className={"flex flex-col items-center text-center gap-4"}>
                    <div className={"p-4 bg-warning/20 rounded-full text-warning animate-pulse"}>
                        <AlertCircle size={48}/>
                    </div>

                    <div className={"space-y-2"}>
                        <h3 className={"text-2xl font-bold text-white"}>Active Lobby Detected</h3>
                        <p className={"text-white/60 max-w-md"}>
                            You are already in a lobby for another game. You must leave your current session before you
                            can join or create a new one here.
                        </p>
                    </div>

                    <div className={"flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center"}>
                        <Button
                            variant={"flat"}
                            color={"warning"}
                            className={"font-semibold"}
                            startContent={<ArrowRight size={18}/>}
                            onPress={() => navigate(`/library/${otherGameId}`)}
                        >
                            Go to Active Game
                        </Button>

                        <Button
                            variant={"bordered"}
                            color={"danger"}
                            className={"font-semibold"}
                            isLoading={isPending}
                            startContent={<LogOut size={18}/>}
                            onPress={() => leaveLobby()}
                        >
                            Leave Current Lobby
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}