import { CardFooter } from "@heroui/card";
import { TicketPercent } from "lucide-react";
import { Button } from "@heroui/button";
import { Cart } from "@/model/shop";


interface CartFooterProps {
    cart: Cart;
    discountDetails: { amount: number; percentage: number };
    finalPrice: number;
    selectedBenefitId?: string;
    onCheckout: (benefitId?: string) => void;
    isCheckingOut: boolean;
}

export function CartFooter({ cart, discountDetails, finalPrice, selectedBenefitId, onCheckout, isCheckingOut }: CartFooterProps) {
    return (
        <CardFooter className="border-t border-white/10 p-6 flex flex-col gap-4 bg-white/5 backdrop-blur-xl">
            <div className="w-full space-y-3">
                <div className="flex justify-between text-white/50 text-sm font-medium">
                    <span>Subtotal</span>
                    <span>€{cart.totalPrice.toFixed(2)}</span>
                </div>
                {selectedBenefitId && (
                    <div className="flex justify-between text-primary font-bold text-sm bg-primary/10 p-2 rounded-lg border border-primary/20">
                        <span className="flex items-center gap-1">
                            <TicketPercent size={14} /> Discount
                        </span>
                        <span>- €{discountDetails.amount.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-bold text-white/70 uppercase tracking-widest">Grand Total</span>
                    <div className="text-right">
                        {selectedBenefitId && <p className="text-xs text-white/20 line-through">€{cart.totalPrice.toFixed(2)}</p>}
                        <span className="text-3xl font-black text-white tracking-tighter">€{finalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <Button
                color="primary"
                size="lg"
                className="w-full font-black text-lg h-14 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all"
                onPress={() => onCheckout(selectedBenefitId)}
                isLoading={isCheckingOut}
            >
                {selectedBenefitId ? "Checkout with discount" : "Checkout"}
            </Button>
        </CardFooter>
    );
}
