import { Card, CardBody, Spinner, Button } from "@heroui/react";
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { usePaymentVerification } from '@/hooks/usePaymentVerification';

export default function PaymentReturnPage() {
    // Haal order ID uit URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId') || urlParams.get('id');

    const { status, message, progress } = usePaymentVerification(orderId);

    const getIcon = () => {
        switch (status) {
            case 'verifying':
                return <Spinner size="lg" color="primary" />;
            case 'success':
                return <CheckCircle className="w-16 h-16 text-green-500" />;
            case 'failed':
                return <XCircle className="w-16 h-16 text-red-500" />;
            case 'error':
                return <AlertCircle className="w-16 h-16 text-orange-500" />;
            default:
                return <Spinner size="lg" />;
        }
    };

    const getColor = () => {
        switch (status) {
            case 'success':
                return 'text-green-600';
            case 'failed':
                return 'text-red-600';
            case 'error':
                return 'text-orange-600';
            default:
                return 'text-gray-700';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <Card className="max-w-md w-full">
                <CardBody className="flex flex-col items-center text-center p-8 gap-4">
                    <div className="mb-2">
                        {getIcon()}
                    </div>

                    <h2 className={`text-2xl font-bold ${getColor()}`}>
                        {message}
                    </h2>

                    <p className="text-gray-600">
                        {progress}
                    </p>

                    {status === 'success' && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg w-full">
                            <p className="text-sm text-green-700">
                                Je wordt automatisch doorgestuurd naar de shop...
                            </p>
                        </div>
                    )}

                    {(status === 'failed' || status === 'error') && (
                        <div className="mt-4 flex gap-2">
                            <Button
                                color="primary"
                                onClick={() => window.location.href = '/shop'}
                            >
                                Terug naar Shop
                            </Button>
                            <Button
                                color="default"
                                variant="bordered"
                                onClick={() => window.location.reload()}
                            >
                                Opnieuw Proberen
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}