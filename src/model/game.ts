import {GameGenre} from "@/model/library.ts";

export interface Game {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    maxlobbysize: number;
    gameUrl :string;
    genre: GameGenre;
}