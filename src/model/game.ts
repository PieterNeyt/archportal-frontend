import {GameGenre} from "@/model/library.ts";

export interface Game {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    maxlobbysize: number;
    gameUrl :string;
    achievements?:Achievement[];
    genre: GameGenre;
}

export interface Achievement {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
}