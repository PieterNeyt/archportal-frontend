import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@heroui/progress";
import {addToast} from "@heroui/toast";
import {createGameSchema, CreateGameValues} from "@/validation/createGameValidation.ts";
import {useAddGame} from "@/hooks/useGame.ts";
import {useState} from "react";
import {Image, Select, SelectItem} from "@heroui/react";
import {GameGenre} from "@/model/GameGenre.ts";


export function CreateGameForm() {
    const {isPending, isError, AddGame} = useAddGame();
    const studioId = "1";
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateGameValues>({
        resolver: zodResolver(createGameSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: CreateGameValues) => {
        AddGame({studioId, ...data});

        if (isError) {
            addToast({
                title: "Failed to create game",
                description: "Something went wrong. Try again or contact support.",
                color: "warning",
            });
            return;
        }

        navigate("/shop");
    };

    const inputClasses = {
        input: "bg-white/5 text-white placeholder:text-white/40",
        inputWrapper: "bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-200",
        label: "text-white/90 font-medium text-sm",
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-lg flex flex-col gap-6 p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div
                        className="w-40 h-40 bg-black border border-white/10 rounded-xl flex justify-center items-center overflow-hidden flex-shrink-0"
                    >
                        {imagePreview ? (
                            <Image
                                isBlurred
                                alt="Game Cover Preview"
                                className="w-full h-full object-cover"
                                src={imagePreview}
                            />
                        ) : (
                            <span className="text-white/40 text-sm">Preview</span>
                        )}
                    </div>
                    <div className="flex-1 flex flex-col gap-4">
                        <Input
                            isRequired
                            errorMessage={errors.title?.message}
                            label="Title"
                            labelPlacement="outside"
                            placeholder="Enter game title"
                            classNames={inputClasses}
                            {...register("title")}
                        />
                        <Input
                            isRequired
                            errorMessage={errors.imageUrl?.message}
                            label="Image URL"
                            labelPlacement="outside"
                            placeholder="Enter image URL"
                            classNames={inputClasses}
                            {...register("imageUrl", {
                                onChange: (e) => setImagePreview(e.target.value),
                            })}
                        />
                    </div>
                </div>

                {/* Description (2 rows) */}
                <Textarea
                    isRequired
                    errorMessage={errors.description?.message}
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Describe your game"
                    type="textarea"
                    classNames={inputClasses}
                    {...register("description")}
                />

                {/* Price and Genre side by side */}
                <div className="flex flex-col md:flex-row gap-4">
                    <Input
                        isRequired
                        errorMessage={errors.price?.message}
                        label="Price"
                        labelPlacement="outside"
                        placeholder="Enter price in USD"
                        type="number"
                        classNames={inputClasses}
                        {...register("price", {valueAsNumber: true})}
                    />
                    <Select
                        isRequired
                        label="Genre"
                        labelPlacement="outside"
                        placeholder="Select a genre"
                        errorMessage={errors.genre?.message}
                        classNames={inputClasses}
                        {...register("genre")}
                    >
                        {Object.values(GameGenre).map((genre) => (
                            <SelectItem key={genre}>
                                {genre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <Input
                    isRequired
                    errorMessage={errors.gameUrl?.message}
                    label="Game URL"
                    labelPlacement="outside"
                    placeholder="Enter game URL"
                    classNames={inputClasses}
                    {...register("gameUrl")}
                />

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isPending}
                        className="px-12 py-6 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        {isPending ? <CircularProgress size="sm"/> : "Create Game"}
                    </Button>
                </div>
            </form>
        </div>
    );
}