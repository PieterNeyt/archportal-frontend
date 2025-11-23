import axios from "axios";

export async function verifyPayment(orderId: string): Promise<boolean> {
    const { data } = await axios.get<boolean>('/api/shop/payment/verify', {
        params: { orderId }
    });
    return data;
}