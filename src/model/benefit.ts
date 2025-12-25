export enum BenefitType {
    USERNAME_COLOR = "USERNAME_COLOR",
    GAME_DISCOUNT = "GAME_DISCOUNT",
    UNIQUE_PROFILE_PICTURE = "UNIQUE_PROFILE_PICTURE"
}

export interface Benefit {
    id: string;
    type: BenefitType;
    name: string;
    description: string;
    pointCost: number;
    configuration: string;
}