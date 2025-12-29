import {useEffect, useRef, useState} from 'react';
import {verifyPayment} from '@/service/paymentService';
import {useNavigate} from "react-router-dom";

type VerificationStatus = 'verifying' | 'success' | 'failed' | 'error';

interface PaymentVerificationState {
    status: VerificationStatus;
    message: string;
    progress: string;
}

export function usePaymentVerification(orderId: string | null) {
    const [state, setState] = useState<PaymentVerificationState>({
        status: 'verifying',
        message: 'Processing payment...',
        progress: 'Checking...'
    });

    const hasVerified = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (hasVerified.current) return;

        const verify = async () => {
            if (!orderId) {
                setState({
                    status: 'error',
                    message: 'No order ID found',
                    progress: 'Check the URL and try again'
                });
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 500));

            setState(prev => ({
                ...prev,
                progress: `Order ID: ${orderId} - Verifying...`
            }));

            try {
                const isVerified = await verifyPayment(orderId);
                hasVerified.current = true;

                if (isVerified) {
                    setState({
                        status: 'success',
                        message: 'Payment successful',
                        progress: 'Your order is being processed'
                    });

                    setTimeout(() => {
                        navigate("/shop?paymentSuccess=true")
                    }, 2000);
                } else {
                    setState({
                        status: 'failed',
                        message: 'Payment failed',
                        progress: 'The payment could not be confirmed'
                    });
                }
            } catch {
                hasVerified.current = true;
                setState({
                    status: 'error',
                    message: 'Something went wrong',
                    progress: 'Please try again later or contact support'
                });
            }
        };

        verify().then();
    }, [navigate, orderId]);

    return state;
}