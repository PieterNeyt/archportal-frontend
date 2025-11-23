import { useEffect, useState, useRef } from 'react';
import { verifyPayment } from '@/service/paymentService';

type VerificationStatus = 'verifying' | 'success' | 'failed' | 'error';

interface PaymentVerificationState {
    status: VerificationStatus;
    message: string;
    progress: string;
}

export function usePaymentVerification(orderId: string | null) {
    const [state, setState] = useState<PaymentVerificationState>({
        status: 'verifying',
        message: 'Betaling verwerken...',
        progress: 'Bezig met controleren...'
    });

    const hasVerified = useRef(false);

    useEffect(() => {
        if (hasVerified.current) return;

        const verify = async () => {
            if (!orderId) {
                setState({
                    status: 'error',
                    message: 'Geen order ID gevonden',
                    progress: 'Controleer de URL en probeer opnieuw'
                });
                return;
            }

            setState(prev => ({
                ...prev,
                progress: `Order ID: ${orderId} - Aan het verifiëren...`
            }));

            try {
                const isVerified = await verifyPayment(orderId);
                hasVerified.current = true;

                if (isVerified) {
                    setState({
                        status: 'success',
                        message: 'Betaling succesvol!',
                        progress: 'Je bestelling wordt verwerkt'
                    });

                    setTimeout(() => {
                        window.location.href = '/shop?paymentSuccess=true';
                    }, 2000);
                } else {
                    setState({
                        status: 'failed',
                        message: 'Betaling mislukt',
                        progress: 'De betaling kon niet worden bevestigd'
                    });
                }
            } catch {
                hasVerified.current = true;
                setState({
                    status: 'error',
                    message: 'Er ging iets mis',
                    progress: 'Probeer het later opnieuw of neem contact op met support'
                });
            }
        };

        verify();
    }, [orderId]);

    return state;
}