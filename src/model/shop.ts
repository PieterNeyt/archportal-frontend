import {Game} from "@/model/game.ts";

export interface Cart {
    items: Game[];
    totalPrice: number;
}

export interface PaymentCreation {
    paymentUrl: string;
    orderId: string;
}