import {GameGenre} from "./GameGenre";

export interface CreateGame {
    studioId: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    gameUrl: string;
    genre: GameGenre;
}