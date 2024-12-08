import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';
import { Loader, Lock, CreditCard, CheckCircle } from 'lucide-react';

interface SecurePaymentProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function SecurePayment({ amount, onSuccess, onError }: SecurePaymentProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handlePayment = async () => {
    try {
      setLoading(true);
      setStatus('processing');

      // Create payment intent
      const paymentIntent = await paymentService.createPaymentIntent(amount);

      // Process payment
      const result = await paymentService.processPayment(paymentIntent.id);

      if (result.status === 'succeeded') {
        setStatus('success');
        onSuccess();
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setStatus('error');
      onError('Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Lock className="w-5 h-5 text-indigo-600 mr-2" />
        <h3 className="text-lg font-semibold">Secure Payment</h3>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-semibold">${amount.toLocaleString()}</p>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <CreditCard className="w-4 h-4 mr-2" />
            <span>Payment processed securely via Stripe</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading || status === 'success'}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
              status === 'success'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white transition-colors`}
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : status === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Payment Successful
              </>
            ) : (
              'Process Payment'
            )}
          </button>

          {status === 'error' && (
            <p className="mt-2 text-sm text-red-600">
              Payment failed. Please try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}