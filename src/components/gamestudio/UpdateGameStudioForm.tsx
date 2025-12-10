import { Input, Textarea } from "@heroui/input";
import { inputClasses } from "@/styles/customClasses";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { GameStudioValues } from "@/validation/createGameStudioValidation";

interface UpdateGameStudioFormProps {
    register: UseFormRegister<GameStudioValues>;
    errors: FieldErrors<GameStudioValues>;
    isError?: boolean;
}

export function UpdateGameStudioForm({ register, errors, isError }: UpdateGameStudioFormProps) {
    return (
        <>
            <Input
                isRequired
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                label="Studio name"
                labelPlacement="outside"
                placeholder="Enter your studio name"
                type="text"
                classNames={inputClasses}
                {...register("name")}
            />

            <Input
                isRequired
                isInvalid={!!errors.IBAN}
                errorMessage={errors.IBAN?.message}
                label="IBAN"
                labelPlacement="outside"
                placeholder="Enter your IBAN"
                type="text"
                classNames={inputClasses}
                {...register("IBAN")}
            />

            <Textarea
                isRequired
                isInvalid={!!errors.description}
                errorMessage={errors.description?.message}
                label="Description"
                labelPlacement="outside"
                placeholder="Tell us about your studio"
                classNames={inputClasses}
                {...register("description")}
            />

            {isError && (
                <div className="p-3 rounded-lg bg-danger-500/10 border border-danger-500/50 text-danger text-sm">
                    Something went wrong.
                </div>
            )}
        </>
    );
}
