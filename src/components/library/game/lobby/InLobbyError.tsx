import {Card, CardBody} from "@heroui/card";
import {AlertCircle} from "lucide-react";
import {Button} from "@heroui/button";

interface LobbyErrorProps {
    handleLeaveLobby: () => void;
}


export function InLobbyError({ handleLeaveLobby }: LobbyErrorProps) {
    return (<Card className="w-full bg-danger/10 border border-danger/20">
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
    </Card>)
}