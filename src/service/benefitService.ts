import axios from "axios";
import { Benefit } from "@/model/benefit";

export async function getAllBenefits(): Promise<Benefit[]> {
    const { data } = await axios.get<Benefit[]>('/api/shop/benefits');
    return data;
}

export async function getBenefitsByIds(ids: string[]): Promise<Benefit[]> {
    if (ids.length === 0) return [];
    const { data } = await axios.get<Benefit[]>('/api/shop/benefits/list', {
        params: { ids: ids.join(',') }
    });
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
export async function getProfileDiscounts(): Promise<Benefit[]> {
    const { data } = await axios.get<Benefit[]>('/api/shop/benefits/discounts');
    return data;
}

export async function getActiveUsernameColor(): Promise<string | null> {
    const { data } = await axios.get<string>('/api/shop/benefits/active-color');
    return data;
}