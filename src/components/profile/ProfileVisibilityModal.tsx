import {useState} from "react";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup} from "@heroui/react";
import {GLASS_CARD_STYLES} from "@/styles/customClasses.ts";
import {SectionDto, SectionType, Visibility} from "@/model/profileSyncDto.ts";

interface ProfileVisibilityModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    initialSections: SectionDto[];
    onSave: (updatedSections: SectionDto[]) => void;
    isLoading: boolean;
}

export function ProfileVisibilityModal({isOpen, onOpenChange, initialSections, onSave, isLoading
}: ProfileVisibilityModalProps) {

    const [localSections, setLocalSections] = useState<SectionDto[]>(initialSections);

    const handleChange = (type: SectionType, visibility: Visibility) => {
        setLocalSections(prev =>
            prev.map(s => s.type === type ? { ...s, visibility } : s)
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            className={`${GLASS_CARD_STYLES} border-white/10 text-white`}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-2xl font-bold">Privacy</ModalHeader>
                        <ModalBody className="space-y-4">
                            {localSections.map((section) => (
                                <div key={section.type} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                    <p className="text-xs font-bold text-primary mb-2 uppercase">{section.type}</p>
                                    <RadioGroup
                                        orientation="horizontal"
                                        value={section.visibility}
                                        onValueChange={(val) => handleChange(section.type, val as Visibility)}
                                    >
                                        <Radio value={Visibility.PUBLIC}>Public</Radio>
                                        <Radio value={Visibility.FRIENDS}>Friends</Radio>
                                        <Radio value={Visibility.PRIVATE}>Private</Radio>
                                    </RadioGroup>
                                </div>
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="flat"
                                onPress={onClose}
                                className="text-white"
                                isDisabled={isLoading}
                            >
                                Annuleren
                            </Button>
                            <Button
                                color="primary"
                                isLoading={isLoading}
                                onPress={() => {
                                    onSave(localSections);
                                    if (!isLoading) onClose();
                                }}
                            >
                                Opslaan
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}