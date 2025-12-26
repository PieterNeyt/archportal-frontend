import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { ShoppingCart, Trash2, X, TicketPercent, Tag, CheckCircle2 } from "lucide-react";
import { Image } from "@heroui/image";
import { closeAll } from "@heroui/toast";
import { useContext, useMemo, useState, useEffect } from "react";
import SecurityContext from "@/context/SecurityContext";
import { useBenefits } from "@/hooks/useBenefits";
import { BenefitType } from "@/model/benefit.ts";
import { Game } from "@/model/game";

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

export function ShoppingCartComponent({
                                          cart,
                                          isOpen,
                                          onClose,
                                          onRemoveItem,
                                          onCheckout,
                                          isCheckingOut
                                      }: ShoppingCartProps) {
    const { loggedInUser } = useContext(SecurityContext);
    const { data: allBenefits } = useBenefits();
    const [selectedBenefitId, setSelectedBenefitId] = useState<string | undefined>(undefined);

    // Sluit toasts als de mand opengaat
    useEffect(() => {
        if (isOpen) closeAll();
    }, [isOpen]);

    const userCoupons = useMemo(() => {
        if (!allBenefits || !loggedInUser?.platformBenefits) return [];
        return allBenefits.filter(benefit =>
            benefit.type === BenefitType.GAME_DISCOUNT &&
            loggedInUser.platformBenefits.includes(benefit.id)
        );
    }, [allBenefits, loggedInUser]);

    const discountDetails = useMemo(() => {
        if (!selectedBenefitId || !allBenefits || !cart) return { amount: 0, percentage: 0 };
        const coupon = allBenefits.find(b => b.id === selectedBenefitId);
        if (!coupon) return { amount: 0, percentage: 0 };
        const percentage = parseInt(coupon.configuration.replace("%", ""));
        return { amount: cart.totalPrice * (percentage / 100), percentage };
    }, [selectedBenefitId, allBenefits, cart]);

    const finalPrice = (cart?.totalPrice || 0) - discountDetails.amount;

    return (

        <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            <div
                className={`relative w-full max-w-md h-full shadow-2xl transition-transform duration-500 ease-out transform ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div
                    className="h-full border-l border-white/10"
                    style={{
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    }}
                >
                    <Card className="h-full rounded-none flex flex-col bg-transparent">
                        <CardHeader className="flex justify-between items-center border-b border-white/10 p-4 bg-transparent">
                            <div className="flex items-center gap-2 text-white">
                                <ShoppingCart size={24} />
                                <h3 className="text-xl font-bold">Shoppingcart ({cart?.items?.length ?? 0})</h3>
                            </div>
                            <Button isIconOnly variant="light" onPress={onClose} className="text-white hover:bg-white/10">
                                <X size={24} />
                            </Button>
                        </CardHeader>

                        <CardBody className="flex-1 overflow-y-auto p-4 bg-transparent space-y-6">
                            {!cart || cart.items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-64 text-white/50">
                                    <ShoppingCart size={64} className="mb-4 opacity-10" />
                                    <p>Your cart is empty.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-3">
                                        {cart.items.map((game) => (
                                            <Card key={game.id} className="p-3 bg-white/5 border border-white/10 group">
                                                <div className="flex gap-3">
                                                    <Image src={game.imageUrl} className="w-16 h-16 object-cover rounded" removeWrapper />
                                                    <div className="flex-1 flex flex-col justify-between">
                                                        <h4 className="font-semibold text-sm text-white line-clamp-1">{game.title}</h4>
                                                        <div className="flex justify-between items-center">
                                                            <p className="font-bold text-primary">€{game.price.toFixed(2)}</p>
                                                            <Button isIconOnly size="sm" color="danger" variant="light" onPress={() => onRemoveItem(game.id)}>
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>

                                    {/* Coupons met selectie*/}
                                    {userCoupons.length > 0 && (
                                        <div className="pt-4 border-t border-white/10">
                                            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <Tag size={14} /> Available coupons
                                            </h4>
                                            <div className="space-y-2">
                                                {userCoupons.map((coupon) => (
                                                    <div
                                                        key={coupon.id}
                                                        onClick={() => setSelectedBenefitId(selectedBenefitId === coupon.id ? undefined : coupon.id)}
                                                        className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                                                            selectedBenefitId === coupon.id
                                                                ? "border-primary bg-primary/10"
                                                                : "border-white/5 bg-white/5 hover:border-white/10"
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2 rounded-lg ${selectedBenefitId === coupon.id ? "bg-primary text-black" : "bg-white/10 text-white"}`}>
                                                                <TicketPercent size={18} />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-white">{coupon.name}</p>
                                                            </div>
                                                        </div>
                                                        {selectedBenefitId === coupon.id && <CheckCircle2 size={18} className="text-primary" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </CardBody>

                        {cart && cart.items.length > 0 && (
                            <CardFooter className="border-t border-white/10 p-6 flex flex-col gap-4 bg-black/20">
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between text-white/50 text-sm">
                                        <span>Subtotal</span>
                                        <span>€{cart.totalPrice.toFixed(2)}</span>
                                    </div>
                                    {selectedBenefitId && (
                                        <div className="flex justify-between text-primary font-bold text-sm">
                                            <span>Discount ({discountDetails.percentage}%)</span>
                                            <span>- €{discountDetails.amount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-lg font-bold text-white">Total</span>
                                        <div className="text-right">
                                            {selectedBenefitId && <p className="text-xs text-white/30 line-through">€{cart.totalPrice.toFixed(2)}</p>}
                                            <span className="text-3xl font-black text-white">€{finalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    color="primary"
                                    size="lg"
                                    className="w-full font-bold text-lg h-14"
                                    onPress={() => onCheckout(selectedBenefitId)}
                                    isLoading={isCheckingOut}
                                >
                                    {selectedBenefitId ? "Checkout with discount" : "Checkout"}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}