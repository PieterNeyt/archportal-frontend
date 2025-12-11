import { Input, Textarea } from "@heroui/input";
import { Image, Select, SelectItem } from "@heroui/react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { GameValues } from "@/validation/createGameValidation.ts";
import { GameGenre } from "@/model/GameGenre.ts";
import { inputClasses, selectClasses } from "@/styles/customClasses.ts";

interface UpdateGameFormProps {
    register: UseFormRegister<GameValues>;
    errors: FieldErrors<GameValues>;
    imagePreview: string | null;
}

export function UpdateGameForm({ register, errors, imagePreview }: UpdateGameFormProps) {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
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
        </div>
    );
}