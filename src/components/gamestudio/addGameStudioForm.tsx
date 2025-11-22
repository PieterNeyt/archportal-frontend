import {createGameStudioSchema, CreateGameStudioValues,} from "@/validation/createGameStudioValidation.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useAddGameStudio} from "@/hooks/useGameStudio.ts";
import {CircleEllipsis} from "lucide-react";

export function CreateGameStudioForm() {
    const {isLoading, isError, AddGameStudio} = useAddGameStudio();

    if (isLoading) {
        return <CircleEllipsis/>;
    }
    if (isError) {
        return <div> ERRORRRRRRRRRRRR </div>;
    }

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateGameStudioValues>({
        resolver: zodResolver(createGameStudioSchema),
        mode: "onChange",
    });

    const onSubmit = (data: CreateGameStudioValues) => {
        AddGameStudio(data)
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md flex flex-col gap-6"
        >
            {/* PERSONAL */}
            <h2 className="text-xl font-semibold text-center text-primary">Personal</h2>

            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    isRequired
                    errorMessage={errors.ownerFirstName?.message}
                    label="First name"
                    labelPlacement="outside"
                    placeholder="Enter your first name"
                    type="text"
                    className="flex-1"
                    classNames={{
                        input: "bg-card text-foreground",
                        inputWrapper: "bg-card border border-border hover:border-ring transition-colors",
                        label: "text-foreground"
                    }}
                    {...register("ownerFirstName")}
                />
                <Input
                    isRequired
                    errorMessage={errors.ownerLastName?.message}
                    label="Last name"
                    labelPlacement="outside"
                    placeholder="Enter your last name"
                    type="text"
                    className="flex-1"
                    classNames={{
                        input: "bg-card text-foreground",
                        inputWrapper: "bg-card border border-border hover:border-ring transition-colors",
                        label: "text-foreground"
                    }}
                    {...register("ownerLastName")}
                />
            </div>

            <Input
                isRequired
                errorMessage={errors.ownerEmail?.message}
                label="E-mail"
                labelPlacement="outside"
                placeholder="Enter your e-mail"
                type="email"
                classNames={{
                    input: "bg-card text-foreground",
                    inputWrapper: "bg-card border border-border hover:border-ring transition-colors",
                    label: "text-foreground"
                }}
                {...register("ownerEmail")}
            />

            {/* DIVIDER */}
            <div className="border-b border-border my-3"/>

            {/* GAME STUDIO */}
            <h2 className="text-xl font-semibold text-center text-primary">Game Studio</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    isRequired
                    errorMessage={errors.name?.message}
                    label="Studio name"
                    labelPlacement="outside"
                    placeholder="Enter your studio name"
                    type="text"
                    className="flex-1"
                    classNames={{
                        input: "bg-card text-foreground",
                        inputWrapper: "bg-card border border-border hover:border-ring transition-colors",
                        label: "text-foreground"
                    }}
                    {...register("name")}
                />
                <Input
                    isRequired
                    errorMessage={errors.IBAN?.message}
                    label="IBAN"
                    labelPlacement="outside"
                    placeholder="Enter your IBAN"
                    type="text"
                    className="flex-1"
                    classNames={{
                        input: "bg-card text-foreground",
                        inputWrapper: "bg-card border border-border hover:border-ring transition-colors",
                        label: "text-foreground"
                    }}
                    {...register("IBAN")}
                />
            </div>

            <Input
                isRequired
                errorMessage={errors.description?.message}
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                type="textarea"
                classNames={{
                    input: "bg-card text-foreground",
                    inputWrapper: "bg-card border border-border hover:border-ring transition-colors",
                    label: "text-foreground"
                }}
                {...register("description")}
            />

            {/* SUBMIT */}
            <div className="flex justify-center mt-2">
                <Button
                    color="primary"
                    type="submit"
                    className="px-10"
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}