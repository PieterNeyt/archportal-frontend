import {Game} from "@/model/game.ts";
import {Cart, PaymentCreation} from "@/model/shop";
import axios from "axios";

// voor nu zo hardcoded maar moet later als inlogfunctionaliteit er is opgelost worden

export async function getGames(): Promise<Game[]> {
    const {data: games} = await axios.get<Game[]>('/api/shop/games');
    return games;
}

export async function getCart(): Promise<Cart> {
    const {data: cart} = await axios.get<Cart>('/api/shop/cart');
    return cart;
}

export async function addToCart(gameId: string): Promise<Cart> {
    const {data: cart} = await axios.put<Cart>('/api/shop/cart/add', null, {
        params: {
            gameId
        }
    });
    return cart;
}

export async function removeFromCart(gameId: string): Promise<Cart> {
    const {data: cart} = await axios.put<Cart>('/api/shop/cart/remove', null, {
        params: {
            gameId
        }
    });
    return cart;
}

export async function checkout(): Promise<PaymentCreation> {
    const {data: payment} = await axios.post<PaymentCreation>('/api/shop/checkout');
    return payment;
}