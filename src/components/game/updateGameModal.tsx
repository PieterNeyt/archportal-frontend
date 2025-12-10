import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Image, Select, SelectItem } from "@heroui/react";

import { Game } from "@/model/game.ts";
import { GameGenre } from "@/model/GameGenre.ts";
import { gameSchema, GameValues } from "@/validation/createGameValidation.ts";
import { inputClasses, selectClasses } from "@/styles/customClasses.ts";

interface UpdateGameModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    game: Game;
}

export function UpdateGameModal({ isOpen, onOpenChange, game }: UpdateGameModalProps) {
    const isPending = false;

    const [imagePreview, setImagePreview] = useState<string | null>(game.imageUrl);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<GameValues>({
        resolver: zodResolver(gameSchema),
        defaultValues: {
            title: game.title,
            imageUrl: game.imageUrl || "",
            description: game.description,
            price: game.price,
            genre: game.genre,
            maxlobbysize: game.maxlobbysize,
            gameUrl: game.gameUrl || ""
        },
        mode: "onChange",
    });

    // Live preview update (alleen visueel)
    const imageUrlValue = watch("imageUrl");
    useEffect(() => {
        setImagePreview(imageUrlValue);
    }, [imageUrlValue]);

    const onSubmit = (data: GameValues) => {
        console.log("Edited Game Data:", data);
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
            <ModalContent className="bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
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
                            <form id="update-game-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                                {/* Top Section: Image Preview & Basic Info */}
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Image Preview */}
                                    <div className="w-40 h-40 bg-black/40 border border-white/10 rounded-xl flex justify-center items-center overflow-hidden flex-shrink-0 self-start">
                                        {imagePreview ? (
                                            <Image
                                                alt="Game Cover Preview"
                                                className="w-full h-full object-cover"
                                                src={imagePreview}
                                                removeWrapper
                                            />
                                        ) : (
                                            <span className="text-white/40 text-xs">No Preview</span>
                                        )}
                                    </div>

                                    {/* Title & Image URL Inputs */}
                                    <div className="flex-1 flex flex-col gap-4">
                                        <Input
                                            isRequired
                                            label="Title"
                                            labelPlacement="outside"
                                            placeholder="Enter game title"
                                            errorMessage={errors.title?.message}
                                            isInvalid={!!errors.title}
                                            classNames={inputClasses}
                                            {...register("title")}
                                        />
                                        <Input
                                            isRequired
                                            label="Image URL"
                                            labelPlacement="outside"
                                            placeholder="https://..."
                                            errorMessage={errors.imageUrl?.message}
                                            isInvalid={!!errors.imageUrl}
                                            classNames={inputClasses}
                                            {...register("imageUrl")}
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <Textarea
                                    isRequired
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Describe your game..."
                                    minRows={4}
                                    errorMessage={errors.description?.message}
                                    isInvalid={!!errors.description}
                                    classNames={inputClasses}
                                    {...register("description")}
                                />

                                {/* Row: Price & Genre */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        isRequired
                                        label="Price"
                                        labelPlacement="outside"
                                        placeholder="0.00"
                                        type="number"
                                        step="0.01"
                                        errorMessage={errors.price?.message}
                                        isInvalid={!!errors.price}
                                        classNames={inputClasses}
                                        {...register("price", { valueAsNumber: true })}
                                    />

                                    <Select
                                        isRequired
                                        label="Genre"
                                        labelPlacement="outside"
                                        placeholder="Select genre"
                                        defaultSelectedKeys={[game.genre]}
                                        errorMessage={errors.genre?.message}
                                        isInvalid={!!errors.genre}
                                        classNames={selectClasses}
                                        {...register("genre")}
                                    >
                                        {Object.values(GameGenre).map((genre) => (
                                            <SelectItem key={genre} textValue={String(genre)}>
                                                {genre}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>

                                {/* Row: Lobby & Game URL */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Input
                                        isRequired
                                        label="Max Lobby Size"
                                        labelPlacement="outside"
                                        type="number"
                                        errorMessage={errors.maxlobbysize?.message}
                                        isInvalid={!!errors.maxlobbysize}
                                        classNames={inputClasses}
                                        {...register("maxlobbysize", { valueAsNumber: true })}
                                    />
                                    <Input
                                        isRequired
                                        label="Game URL"
                                        labelPlacement="outside"
                                        placeholder="https://..."
                                        errorMessage={errors.gameUrl?.message}
                                        isInvalid={!!errors.gameUrl}
                                        classNames={inputClasses}
                                        {...register("gameUrl")}
                                    />
                                </div>
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