import {GameGenre} from "@/model/library.ts";

export interface Game {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string;
    price: number;
    genre:GameGenre;
}