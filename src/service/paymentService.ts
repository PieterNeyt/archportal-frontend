import axios from "axios";

export interface PaymentVerification {
    verified: boolean;
    success: boolean;
}

export async function verifyPayment(orderId: string): Promise<PaymentVerification> {
    const { data } = await axios.get<PaymentVerification>('/api/shop/payment/verify', {
        params: { orderId }
    });
    return data;
}