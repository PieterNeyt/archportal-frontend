import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/button";
import {Game} from "@/model/game.ts";
import {gameSchema, GameValues} from "@/validation/createGameValidation.ts";
import {UpdateGameForm} from "@/components/game/UpdateGameForm.tsx";
import {useUpdateGame} from "@/hooks/useGames.ts";
import {AlertCircle} from "lucide-react";

interface UpdateGameModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    game: Game;
}

export function UpdateGameModal({isOpen, onOpenChange, game}: UpdateGameModalProps) {
    const {isError, isPending, UpdateGame} = useUpdateGame();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<GameValues>({
        resolver: zodResolver(gameSchema),
        values: game,
        mode: "onChange"
    });

    const imageUrlValue = watch("imageUrl");
    const [imagePreview, setImagePreview] = useState<string | null>(game.imageUrl);

    useEffect(() => {
        setImagePreview(imageUrlValue);
    }, [imageUrlValue]);

    const onSubmit = async (data: GameValues) => {
        await UpdateGame({id: game.id, ...data});
        onOpenChange(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="center"
            backdrop="blur"
            size="3xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-transparent",
                backdrop: "bg-black/50",
            }}
        >
            <ModalContent className="bg-black/30 backdrop-blur-xl border border-white/10 shadow-2xl">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white">Update Game</h2>
                            <p className="text-white/50 text-sm font-normal">
                                Edit details for <span className="text-primary">{game.title}</span>
                            </p>
                        </ModalHeader>

                        <div className="border-t border-white/10"></div>

                        <ModalBody className="p-8">
                            <form
                                id="update-game-form"
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-4"
                            >
                                <UpdateGameForm
                                    register={register}
                                    errors={errors}
                                    imagePreview={imagePreview}
                                />

                                {isError && (
                                    <div
                                        className="flex items-center gap-3 p-4 mt-2 rounded-xl bg-danger-500/10 border border-danger-500/50 text-danger animate-appearance-in">
                                        <AlertCircle size={20}/>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">Update failed</span>
                                            <span className="text-xs opacity-80">Something went wrong while saving changes. Please try again.</span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </ModalBody>

                        <div className="border-t border-white/10"></div>

                        <ModalFooter className="px-8 py-6">
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
                                form="update-game-form"
                                isLoading={isPending}
                                className="font-semibold shadow-lg shadow-primary/20"
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