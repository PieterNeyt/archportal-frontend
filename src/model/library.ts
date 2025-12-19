import {Achievement} from "@/model/game.ts";

export enum GameGenre {
    STRATEGY = "STRATEGY",
    FAMILY = "FAMILY",
    PARTY = "PARTY",
    COOPERATIVE = "COOPERATIVE",
    DEDUCTION = "DEDUCTION",
    DECK_BUILDING = "DECK_BUILDING",
    WORKER_PLACEMENT = "WORKER_PLACEMENT",
    AREA_CONTROL = "AREA_CONTROL",
    ABSTRACT = "ABSTRACT",
    ADVENTURE = "ADVENTURE",
    ECONOMIC = "ECONOMIC",
    PUZZLE = "PUZZLE",
    WAR = "WAR",
    THEMED = "THEMED",
    SOCIAL_DEDUCTION = "SOCIAL_DEDUCTION",
    ENGINE_BUILDING = "ENGINE_BUILDING"
}

export interface LibraryGame {
    game:GlobalGameDto;
    favorite:boolean;
}

export interface GlobalGameDto {
    id: string;
    studioId: string;
    title: string;
    description: string;
    imageUrl: string;
    gameUrl: string;
    price: number;
    genre: GameGenre;
    achievements: Achievement[];
}