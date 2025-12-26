import { Card, CardBody } from "@heroui/card";
import { closeAll } from "@heroui/toast";
import { useContext, useMemo, useState, useEffect } from "react";
import SecurityContext from "@/context/SecurityContext.ts";
import { useBenefits } from "@/hooks/useBenefits.ts";
import { BenefitType } from "@/model/benefit.ts";
import { Game } from "@/model/game.ts";

import { CartHeader } from "./CartHeader";
import { CartItem } from "./CartItem";
import { CartCoupons } from "./CartCoupons";
import { CartFooter } from "./CartFooter";

interface Cart {
    items: Game[];
    totalPrice: number;
}

interface ShoppingCartProps {
    cart?: Cart;
    isOpen: boolean;
    onClose: () => void;
    onRemoveItem: (gameId: string) => void;
    onCheckout: (benefitId?: string) => void;
    isCheckingOut: boolean;
}

export function ShoppingCartComponent({ cart, isOpen, onClose, onRemoveItem, onCheckout, isCheckingOut }: ShoppingCartProps) {
    const { loggedInUser } = useContext(SecurityContext);
    const { data: allBenefits } = useBenefits();
    const [selectedBenefitId, setSelectedBenefitId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (isOpen) closeAll();
    }, [isOpen]);

    const userCoupons = useMemo(() => {
        if (!allBenefits || !loggedInUser?.platformBenefits) return [];
        return allBenefits.filter(
            (benefit) => benefit.type === BenefitType.GAME_DISCOUNT && loggedInUser.platformBenefits.includes(benefit.id)
        );
    }, [allBenefits, loggedInUser]);

    const discountDetails = useMemo(() => {
        if (!selectedBenefitId || !allBenefits || !cart) return { amount: 0, percentage: 0 };
        const coupon = allBenefits.find((b) => b.id === selectedBenefitId);
        if (!coupon) return { amount: 0, percentage: 0 };
        const percentage = parseInt(coupon.configuration.replace("%", ""));
        return { amount: cart.totalPrice * (percentage / 100), percentage };
    }, [selectedBenefitId, allBenefits, cart]);

    const finalPrice = (cart?.totalPrice || 0) - discountDetails.amount;

    return (
        <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}
                onClick={onClose}
            />

            <div className={`relative w-full max-w-md h-full shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div
                    className="h-full border-l border-white/10"
                    style={{
                        backdropFilter: "blur(25px) saturate(190%)",
                        WebkitBackdropFilter: "blur(25px) saturate(190%)",
                        backgroundColor: "rgba(35, 35, 35, 0.65)",
                    }}
                >
                    <Card className="h-full rounded-none flex flex-col bg-transparent shadow-none border-none">
                        <CartHeader cartCount={cart?.items?.length ?? 0} onClose={onClose} />

                        <CardBody className="flex-1 overflow-y-auto p-5 space-y-6">
                            {!cart || cart.items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-white/40">
                                    <p className="font-medium">Your cart is empty.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        {cart.items.map((game) => (
                                            <CartItem key={game.id} game={game} onRemove={onRemoveItem} />
                                        ))}
                                    </div>
                                    <CartCoupons userCoupons={userCoupons} selectedBenefitId={selectedBenefitId} onSelect={setSelectedBenefitId} />
                                </>
                            )}
                        </CardBody>

                        {cart && cart.items.length > 0 && (
                            <CartFooter
                                cart={cart}
                                discountDetails={discountDetails}
                                finalPrice={finalPrice}
                                selectedBenefitId={selectedBenefitId}
                                onCheckout={onCheckout}
                                isCheckingOut={isCheckingOut}
                            />
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
