import {Card, CardBody, CardFooter, CardHeader} from "@heroui/card";
import {Button} from "@heroui/button";
import {Gamepad2, ShoppingCart, Trash2, X} from "lucide-react";
import {Image} from "@heroui/image";
import {Game} from "@/model/game";
import {closeAll} from "@heroui/toast";

interface Cart {
    items: Game[];
    totalPrice: number;
}

interface ShoppingCartProps {
    cart?: Cart;
    isOpen: boolean;
    onClose: () => void;
    onRemoveItem: (gameId: string) => void;
    onCheckout: () => void;
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
    if (!isOpen) return null;

    closeAll();

    const itemCount = cart?.items?.length ?? 0;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end pointer-events-none">
            {/* backdrop met blur */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                style={{
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
                onClick={onClose}
            />

            {/* Shopping cart panel */}
            <div
                className={`pointer-events-auto w-full max-w-md h-full shadow-2xl transform transition-transform duration-300 relative ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div
                    className="h-full"
                    style={{
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Card className="h-full rounded-none flex flex-col bg-transparent border-l border-white/10">
                        <CardHeader className="flex justify-between items-center border-b border-white/10 p-4 bg-transparent">
                            <div className="flex items-center gap-2">
                                <ShoppingCart size={24} className="text-foreground"/>
                                <h3 className="text-xl font-bold text-foreground">
                                    Shoppingcart ({itemCount})
                                </h3>
                            </div>
                            <Button
                                isIconOnly
                                variant="light"
                                onPress={onClose}
                                className="text-foreground hover:bg-white/10"
                            >
                                <X size={24}/>
                            </Button>
                        </CardHeader>

                        <CardBody className="flex-1 overflow-y-auto p-4 bg-transparent">
                            {!cart || !cart.items || cart.items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                    <ShoppingCart size={64} className="mb-4 opacity-50"/>
                                    <p>Your shoppingcart is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.items.map((game) => (
                                        <Card key={game.id} className="p-3 bg-white/5 backdrop-blur-md border border-white/10">
                                            <div className="flex gap-3">
                                                {game.imageUrl ? (
                                                    <Image
                                                        src={game.imageUrl}
                                                        alt={game.title}
                                                        className="w-20 h-20 object-cover rounded"
                                                        removeWrapper
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-20 h-20 flex items-center justify-center bg-white/10 rounded border border-white/10">
                                                        <Gamepad2 size={32} className="text-muted-foreground"/>
                                                    </div>
                                                )}

                                                <div className="flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-semibold line-clamp-1 text-foreground">
                                                            {game.title}
                                                        </h4>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <p className="font-bold text-foreground">
                                                            €{game.price.toFixed(2)}
                                                        </p>

                                                        <Button
                                                            isIconOnly
                                                            size="sm"
                                                            color="danger"
                                                            variant="light"
                                                            onPress={() => onRemoveItem(game.id)}
                                                            className="hover:bg-red-500/20"
                                                        >
                                                            <Trash2 size={16}/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardBody>

                        {cart && cart.items && cart.items.length > 0 && (
                            <CardFooter className="border-t border-white/10 p-4 flex flex-col gap-4 bg-transparent">
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-lg font-semibold text-foreground">Total:</span>
                                    <span className="text-2xl font-bold text-foreground">
                                        €{(cart.totalPrice || 0).toFixed(2)}
                                    </span>
                                </div>

                                <Button
                                    color="primary"
                                    size="lg"
                                    className="w-full"
                                    onPress={onCheckout}
                                    isLoading={isCheckingOut}
                                >
                                    Checkout
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
}