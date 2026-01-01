import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { ShoppingCart } from "lucide-react";
import { Benefit } from "@/model/benefit";

interface PurchaseConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    benefit: Benefit | null;
    userPoints: number;
    onConfirm: () => void;
}

export function PurchaseConfirmationModal({
                                              isOpen,
                                              onClose,
                                              benefit,
                                              userPoints,
                                              onConfirm
                                          }: PurchaseConfirmationModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            backdrop="blur"
            classNames={{
                base: "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl",
                header: "border-b border-white/5 text-white",
                body: "py-6 text-white",
                footer: "border-t border-white/5",
                closeButton: "hover:bg-white/10 active:bg-white/20 transition-colors",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex gap-3 items-center">
                            <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
                                <ShoppingCart className="text-primary" size={20} />
                            </div>
                            <span className="font-bold text-xl tracking-tight">Confirm Purchase</span>
                        </ModalHeader>

                        <ModalBody>
                            <div className="space-y-4">
                                <p className="text-white/70 leading-relaxed">
                                    Are you sure you want to unlock <span className="text-primary font-bold">"{benefit?.name}"</span>?
                                    This will be immediately applied to your profile.
                                </p>

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex justify-between items-center group hover:border-warning/50 transition-colors">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Total Cost</span>
                                        <span className="text-2xl font-black text-warning italic">
                                            {benefit?.pointCost} <span className="text-xs not-italic opacity-60">PTS</span>
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Your Balance</span>
                                        <p className="text-sm font-medium text-white/80">
                                            {userPoints} remaining
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="gap-3">
                            <Button
                                variant="flat"
                                className="bg-white/5 hover:bg-white/10 text-white border border-white/10"
                                onPress={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                className="font-bold shadow-lg shadow-primary/20 px-8"
                                onPress={onConfirm}
                            >
                                Confirm & Unlock
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}