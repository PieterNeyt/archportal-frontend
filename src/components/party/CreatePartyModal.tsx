import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import {useForm} from "react-hook-form";
import {CreatePartyValues, partySchema} from "@/validation/createPartyValidation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Trophy, Users} from "lucide-react";
import {Input} from "@heroui/input";
import {Button} from "@heroui/button";
import {useCreateParty} from "@/hooks/useParties.ts";

export default function CreatePartyModal() {
    const {isPending, createParty} = useCreateParty();
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: {isValid, errors},
        reset,
        setValue,
        watch
    } = useForm<CreatePartyValues>({
        resolver: zodResolver(partySchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            maxMembers: 5
        }
    })

    const selectedMax = watch("maxMembers");

    const onSubmit = async (party: CreatePartyValues) => {
        await createParty(party)
    }

    const handleModalClose = () => {
        reset();
        onClose();
    }

    const buttonClass = (num: number) => {
        return selectedMax === num
            ? 'bg-primary border-primary text-black'
            : 'bg-white/5 border-white/5 text-white/50 hover:bg-white/10'

    }

    return (
        <>
            <Button
                color={"primary"}
                type={"button"}
                size={"lg"}
                className={"w-full"}
                startContent={<Users className={"size-5"}/>}
                onPress={() => onOpen()}
            >
                Create a party
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={"center"}
                className={"bg-black/30 backdrop-blur-xl border border-white/10 pb-2"}>
                <ModalContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex items-center gap-2">
                            <Trophy size={20} className="text-primary"/>
                            <span className="text-white">Create New Party</span>
                        </ModalHeader>

                        <ModalBody className="py-6">
                            <div className="space-y-6">
                                <Input
                                    {...register("title")}
                                    label="Party Title"
                                    placeholder="Enter party name..."
                                    labelPlacement="outside"
                                    variant="bordered"
                                    isInvalid={!!errors.title}
                                    errorMessage={errors.title?.message}
                                    classNames={{input: "text-white"}}
                                />

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-white/70 flex items-center gap-2">
                                        <Users size={16}/> Max Members
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <Button
                                                key={num}
                                                type="button"
                                                onPress={() => setValue("maxMembers", num)}
                                                className={`py-3 rounded-xl font-bold transition-all border-1 ${buttonClass(num)}`}
                                            >
                                                {num}
                                            </Button>
                                        ))}
                                    </div>
                                    {errors.maxMembers && (
                                        <p className="text-tiny text-danger">{errors.maxMembers.message}</p>
                                    )}
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="flat"
                                onPress={handleModalClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                type="submit"
                                isLoading={isPending}
                                isDisabled={!isValid || isPending}
                            >
                                Launch Party
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>

            </Modal>
        </>
    );
}