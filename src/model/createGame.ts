import {GameGenre} from "./GameGenre";

export interface CreateGame {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    gameUrl: string;
    genre: GameGenre;
    maxlobbysize:number;
}