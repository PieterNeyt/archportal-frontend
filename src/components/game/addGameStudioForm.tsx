import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useNavigate} from "react-router-dom";
import {CircularProgress} from "@heroui/progress";
import {addToast} from "@heroui/toast";
import {createGameSchema, CreateGameValues} from "@/validation/createGameValidation.ts";
import {useAddGame} from "@/hooks/useGame.ts";

export function CreateGameForm() {
    const {isPending, isError, AddGame} = useAddGame();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateGameValues>({
        resolver: zodResolver(createGameSchema),
        mode: "onChange",
    });

    const onSubmit = (data: CreateGameValues) => {
        AddGame(data);

        if (isPending) {
            return <CircularProgress aria-label="Loading..."/>;
        }

        if (isError) {
            return addToast({
                title: "Failed to create account",
                description: "Something went wrong. Try again or contact support.",
                color: "warning",
            });
        }

        return navigate("/shop");
    };

    const inputClasses = {
        input: "bg-white/5 text-white placeholder:text-white/40",
        inputWrapper: "bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm transition-all duration-200",
        label: "text-white/90 font-medium text-sm"
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto flex flex-col gap-6 p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
        >
            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"/>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 text-sm text-white/50">Studio Details</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">

                <Input
                    isRequired
                    errorMessage={errors.description?.message}
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Tell us about your studio"
                    type="textarea"
                    classNames={inputClasses}
                    {...register("description")}
                />

                <div className="flex justify-center mt-6">
                    <Button
                        color="primary"
                        type="submit"
                        disabled={isPending}
                        className="px-12 py-6 rounded-xl bg-white/10 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:bg-white/15 hover:border-white/30 hover:shadow-xl hover:scale-105 transition-all duration-200 font-semibold"
                    >
                        {isPending ? <CircularProgress size="sm"/> : "Create Studio"}
                    </Button>
                </div>
            </div>
        </form>
    );
}