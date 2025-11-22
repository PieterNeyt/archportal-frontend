import {createGameStudioSchema, CreateGameStudioValues,} from "@/validation/createGameStudioValidation.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";

export function CreateGameStudioForm() {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<CreateGameStudioValues>({
        resolver: zodResolver(createGameStudioSchema),
        mode: "onChange",
    });

    const onSubmit = (data: CreateGameStudioValues) => {
        console.log("Submitted data:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md flex flex-col gap-6"
        >
            {/* PERSONAL */}
            <h2 className="text-xl font-semibold text-center">Personal</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    isRequired
                    errorMessage={errors.ownerFirstName?.message}
                    label="First name"
                    labelPlacement="outside"
                    placeholder="Enter your first name"
                    type="text"
                    className="flex-1"
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
                {...register("ownerEmail")}
            />

            {/* DIVIDER */}
            <div className="border-b border-default-200 dark:border-default-100 my-3"/>

            {/* GAME STUDIO */}
            <h2 className="text-xl font-semibold text-center">Game Studio</h2>
            <div className="flex flex-col md:flex-row gap-4">
                <Input
                    isRequired
                    errorMessage={errors.name?.message}
                    label="Studio name"
                    labelPlacement="outside"
                    placeholder="Enter your studio name"
                    type="text"
                    className="flex-1"
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
                {...register("description")}
            />

            {/* SUBMIT */}
            <div className="flex justify-center mt-2">
                <Button color="primary" type="submit" className="px-10">
                    Submit
                </Button>
            </div>
        </form>
    );
}
