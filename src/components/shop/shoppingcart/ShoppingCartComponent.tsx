import {Card, CardBody} from "@heroui/card";
import {closeAll} from "@heroui/toast";
import {useEffect, useMemo, useState} from "react";
import {useProfileDiscounts} from "@/hooks/useBenefits.ts";
import {Game} from "@/model/game.ts";

import {CartHeader} from "./CartHeader";
import {CartItem} from "./CartItem";
import {CartCoupons} from "./CartCoupons";
import {CartFooter} from "./CartFooter";
import {useCheckout} from "@/hooks/useCheckout";

interface Cart {
    items: Game[];
    totalPrice: number;
}

interface ShoppingCartProps {
    cart?: Cart;
    isOpen: boolean;
    onClose: () => void;
    onRemoveItem: (gameId: string) => void;
}

export function ShoppingCartComponent({ cart, isOpen, onClose, onRemoveItem}: ShoppingCartProps) {
    const {data: userCoupons = []} = useProfileDiscounts();
    const [selectedBenefitId, setSelectedBenefitId] = useState<string | undefined>(undefined);
    const { checkout } = useCheckout();

    useEffect(() => {
        if (isOpen) closeAll();
    }, [isOpen]);


    const discountDetails = useMemo(() => {
        if (!selectedBenefitId || !userCoupons || !cart) return { amount: 0, percentage: 0 };
        const coupon = userCoupons.find((b) => b.id === selectedBenefitId);
        if (!coupon) return { amount: 0, percentage: 0 };
        const percentage = parseInt(coupon.configuration.replace("%", ""));
        return { amount: cart.totalPrice * (percentage / 100), percentage };
    }, [selectedBenefitId, userCoupons, cart]);

    const finalPrice = (cart?.totalPrice || 0) - discountDetails.amount;

    const handleCheckout = () => {
        checkout(selectedBenefitId);
    };
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
                                onCheckout={handleCheckout}
                            />
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}
