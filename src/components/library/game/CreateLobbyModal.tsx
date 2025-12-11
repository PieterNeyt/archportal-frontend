import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useStartMultiplayerLobby } from "@/hooks/useLobbies";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLobbySchema, CreateLobbyValues } from "@/validation/createLobbyValidation.ts";
import { inputClasses } from "@/styles/customClasses.ts";
import { useMemo } from "react";

interface CreateLobbyModalProps {
    isOpen: boolean;
    onClose: () => void;
    gameId: string;
    maxlobbysize: number;
}

export function CreateLobbyModal({ isOpen, onClose, gameId, maxlobbysize }: CreateLobbyModalProps) {
    const { startLobby, isPending } = useStartMultiplayerLobby();

    const schema = useMemo(() => createLobbySchema(maxlobbysize), [maxlobbysize]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateLobbyValues>({
        resolver: zodResolver(schema),
        values: {
            lobbysize: maxlobbysize,
            title: ""
        },
        mode: "onChange"
    });

    const onSubmit = async (data: CreateLobbyValues) => {
        await startLobby({
            gameId,
            ...data
        });
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
            backdrop="blur"
            classNames={{
                base: "bg-transparent",
                backdrop: "bg-black/50",
            }}
        >
            <ModalContent className="bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">
                {(onClose) => (
                    <>
                        {/* Header */}
                        <ModalHeader className="flex flex-col gap-1 px-6 py-4 text-white">
                            Create New Lobby
                        </ModalHeader>

                        <div className="border-t border-white/10"></div>

                        {/* Body */}
                        <ModalBody className="py-6 px-6">
                            <form
                                id="create-lobby-form"
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                            <div className="space-y-14">
                                    <Input
                                        isRequired
                                        isInvalid={!!errors.title}
                                        errorMessage={errors.title?.message}
                                        label="Lobby name"
                                        labelPlacement="outside"
                                        placeholder="Enter lobby name"
                                        type="text"
                                        classNames={inputClasses}
                                        {...register("title")}
                                    />
                                    <Input
                                        isRequired
                                        isInvalid={!!errors.lobbysize}
                                        errorMessage={errors.lobbysize?.message}
                                        label="Max Players"
                                        labelPlacement="outside"
                                        placeholder="Enter Max Players"
                                        type="number"
                                        classNames={inputClasses}
                                        {...register("lobbysize", { valueAsNumber: true })}
                                    />
                                </div>
                            </form>
                        </ModalBody>

                        <div className="border-t border-white/10"></div>

                        {/* Footer */}
                        <ModalFooter className="flex gap-2 justify-end px-6 py-4">
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={onClose}
                                isDisabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                form="create-lobby-form" // Linkt de knop aan het formulier hierboven
                                isLoading={isPending}
                            >
                                Create Lobby
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}