import {GameStudio} from "@/model/gameStudio.ts";
import {useUpdateGameStudio} from "@/hooks/useGameStudio.ts";
import {useForm} from "react-hook-form";
import {gameStudioSchema, GameStudioValues} from "@/validation/createGameStudioValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {UpdateGameStudioForm} from "@/components/gamestudio/UpdateGameStudioForm.tsx";

export interface UpdateGameStudioModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    gameStudio: GameStudio;
}

export function UpdateGameStudioModal({isOpen, onOpenChange, gameStudio}: UpdateGameStudioModalProps) {
    const {
        isPending,
        isError,
        UpdateGameStudio
    } = useUpdateGameStudio();

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<GameStudioValues>({
        resolver: zodResolver(gameStudioSchema),
        values: gameStudio,
        mode: "onChange"
    });

    const onSubmit = async (data: GameStudioValues) => {
        await UpdateGameStudio({
            id: gameStudio.id,
            ownerId: gameStudio.ownerId,
            ...data
        });
        onOpenChange(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
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
                        <ModalHeader className="flex flex-col gap-1 px-6 py-4">
                            Update: <span className="text-primary">{gameStudio.name}</span>
                        </ModalHeader>

                        <div className="border-t border-white/10"></div>

                        {/* Body */}
                        <ModalBody className="py-6 px-6">
                            <form
                                id="update-studio-form"
                                className="flex flex-col gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <UpdateGameStudioForm
                                    register={register}
                                    errors={errors}
                                    isError={isError}
                                />
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
                                Close
                            </Button>

                            <Button
                                color="primary"
                                type="submit"
                                form="update-studio-form"
                                isLoading={isPending}
                            >
                                Save Changes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
