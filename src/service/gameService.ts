import {CreateGame} from "@/model/createGame";
import {Achievement, Game} from "@/model/game.ts";
import {Cart, PaymentCreation} from "@/model/shop";
import axios from "axios";


export async function getGames(): Promise<Game[]> {
    const {data: games} = await axios.get<Game[]>('/api/shop/games');
    return games;
}

export async function getGame(id:string): Promise<Game> {
    const {data: game} = await axios.get<Game>(`/api/shop/game/${id}`);
    return game;
}

export async function getGamesFromStudio(): Promise<Game[]> {
    const {data: games} = await axios.get<Game[]>('/api/games/studio');
    return games;
}

export async function getCart(): Promise<Cart> {
    const {data: cart} = await axios.get<Cart>('/api/shop/cart');
    return cart;
}

export async function updateGame(game:Game): Promise<Game> {
    const {data: newGame} = await axios.put<Game>('/api/games',game);
    return newGame;
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

export async function checkout(benefitId?: string): Promise<PaymentCreation> {
    const {data: payment} = await axios.post<PaymentCreation>(
        '/api/shop/checkout',
        null,
        { params: { benefitId } }
    );
    return payment;
}


export async function AddGame(newGame: CreateGame) {
    const {data: game} = await axios.post<CreateGame>(`/api/games`, newGame)
    return game
}

export async function addAchievement(gameId: string, achievement: Achievement): Promise<Achievement> {
    const { data: newAchievement } = await axios.post<Achievement>(
        `/api/games/${gameId}/achievement`,
        achievement
    );
    return newAchievement;
}