import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input, Textarea} from "@heroui/input";
import {Button} from "@heroui/button";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@heroui/progress";
import {gameSchema, GameValues} from "@/validation/createGameValidation.ts";
import {useState} from "react";
import {Image, Select, SelectItem} from "@heroui/react";
import {GameGenre} from "@/model/GameGenre.ts";
import {inputClasses, selectClasses} from "@/styles/customClasses.ts";
import {MessageModal} from "@/components/MessageModal.tsx";
import {useAddGame} from "@/hooks/useGames.ts";


export function CreateGameForm() {
    const {isPending, isError, AddGame} = useAddGame();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<GameValues>({
        resolver: zodResolver(gameSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: GameValues) => {
        await AddGame(data);
        if (!isError) {
            setIsOpen(true);
        }

    };

    return (
        <div className="flex justify-center items-center w-full">
            <MessageModal title={"Game successfully created"}
                          message={"Youre game has been successfully created. Go to youre gamestudio to see the game and updated if needed!"}
                          action={() => {
                              setIsOpen(false);
                              navigate(`/gamestudio}`)
                          }}
                          open={isOpen}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-3xl flex flex-col gap-8 p-10 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
            >
                <div className="flex flex-col md:flex-row gap-6">
                    <div
                        className="w-48 h-48 bg-black border border-white/10 rounded-xl flex justify-center items-center overflow-hidden flex-shrink-0"
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
                    <div className="flex-1 flex flex-col gap-5">
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
                    minRows={4}
                    classNames={inputClasses}
                    {...register("description")}
                />

                {/* Price and Genre side by side */}
                <div className="flex flex-col md:flex-row gap-6">
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
                        classNames={selectClasses}
                        {...register("genre")}
                        data-a11y-ignore="aria-hidden-focus"
                    >
                        {Object.values(GameGenre).map((genre) => (
                            <SelectItem key={genre} textValue={genre + ""}>
                                {genre}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <Input
                        isRequired
                        errorMessage={errors.maxlobbysize?.message}
                        label="Max Lobby Size"
                        labelPlacement="outside"
                        placeholder="Enter Max Lobby Size"
                        type="number"
                        classNames={inputClasses}
                        {...register("maxlobbysize", {valueAsNumber: true})}
                    />
                    <Input
                        isRequired
                        errorMessage={errors.gameUrl?.message}
                        label="Game URL"
                        labelPlacement="outside"
                        placeholder="Enter game URL"
                        classNames={inputClasses}
                        {...register("gameUrl")}
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isPending}
                        className="px-16 py-7 rounded-xl bg-white/10 text-white text-lg border border-white/20 backdrop-blur-sm shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        {isPending ? <CircularProgress size="sm"/> : "Create Game"}
                    </Button>
                </div>
            </form>
        </div>
    );
}