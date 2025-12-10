import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useStartMultiplayerLobby } from "@/hooks/useLobbies";

interface CreateLobbyModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameId: string;
}

export function CreateLobbyModal({ isOpen, onClose, gameId }: CreateLobbyModalProps) {
    const [lobbyName, setLobbyName] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("4");
    const { startLobby, isPending } = useStartMultiplayerLobby();

    const handleCreate = async () => {
        if (!lobbyName.trim()) return;

        try {
            await startLobby({
                gameId,
            });
            setLobbyName("");
            setMaxPlayers("4");
            onClose();
        } catch (error) {
            console.error("Failed to create lobby:", error);
        }
    };

    const handleClose = () => {
        setLobbyName("");
        setMaxPlayers("4");
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            classNames={{
                base: "bg-black/90 border border-white/10",
                header: "border-b border-white/10",
                footer: "border-t border-white/10",
            }}
        >
            <ModalContent>
                <ModalHeader className="text-white">Create New Lobby</ModalHeader>
                <ModalBody className="py-6">
                    <div className="space-y-4">
                        <Input
                            label="Lobby Name"
                            placeholder="Enter lobby name"
                            value={lobbyName}
                            onValueChange={setLobbyName}
                            classNames={{
                                input: "text-white",
                                label: "text-white/80",
                            }}
                        />
                        <Input
                            type="number"
                            label="Max Players"
                            placeholder="4"
                            value={maxPlayers}
                            onValueChange={setMaxPlayers}
                            min="2"
                            max="10"
                            classNames={{
                                input: "text-white",
                                label: "text-white/80",
                            }}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onPress={handleCreate}
                        isLoading={isPending}
                        isDisabled={!lobbyName.trim()}
                    >
                        Create Lobby
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}