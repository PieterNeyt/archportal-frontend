import axios from "axios";
import { Benefit } from "@/model/benefit";

export async function getBenefits(): Promise<Benefit[]> {
    const { data } = await axios.get<Benefit[]>('/api/shop/benefits');
    return data;
}

export async function buyBenefit(benefitId: string): Promise<number> {
    const { data } = await axios.post<number>(`/api/shop/benefits/${benefitId}/buy`);
    return data;
}

export async function getPoints(): Promise<number> {
    const { data } = await axios.get<number>('/api/profile/points');
    return data;
}