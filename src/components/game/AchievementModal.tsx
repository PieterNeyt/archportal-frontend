import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {AchievementFormValues, achievementSchema} from "@/validation/AchievementValidation.ts";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    onSubmit: (data: AchievementFormValues) => void;
}

export function AchievementModal({ isOpen, onOpenChange, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<AchievementFormValues>({
        resolver: zodResolver(achievementSchema),
    });

    const handleFormSubmit = (data: AchievementFormValues) => {
        onSubmit(data);
        reset();
        onOpenChange();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="dark text-foreground">
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">Add New Achievement</ModalHeader>
                        <ModalBody>
                            <Input
                                {...register("title")}
                                label="Title"
                                placeholder="E.g. First Blood"
                                isInvalid={!!errors.title}
                                errorMessage={errors.title?.message}
                                variant="bordered"
                            />
                            <Textarea
                                {...register("description")}
                                label="Description"
                                placeholder="How do you earn this?"
                                isInvalid={!!errors.description}
                                errorMessage={errors.description?.message}
                                variant="bordered"
                            />
                            <Input
                                {...register("imageUrl")}
                                label="Icon URL"
                                placeholder="https://..."
                                isInvalid={!!errors.imageUrl}
                                errorMessage={errors.imageUrl?.message}
                                variant="bordered"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button color="primary" type="submit" isLoading={isSubmitting}>
                                Create Achievement
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}