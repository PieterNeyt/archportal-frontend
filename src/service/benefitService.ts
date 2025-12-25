import axios from "axios";
import { Benefit } from "@/model/benefit";

export async function getBenefits(): Promise<Benefit[]> {
    const { data } = await axios.get<Benefit[]>('/api/shop/benefits');
    return data;
}

export async function buyBenefit(benefitId: string): Promise<void> {
    await axios.post(`/api/shop/benefits/${benefitId}/buy`);
}

export async function getPoints(): Promise<number> {
    const { data } = await axios.get<number>('/api/profile/points');
    return data;
}