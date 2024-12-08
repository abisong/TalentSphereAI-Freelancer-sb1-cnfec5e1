interface PaymentIntent {
  id: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed';
}

export const paymentService = {
  async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    // Simulate payment intent creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: 'pi_' + Math.random().toString(36).substr(2, 9),
      amount,
      status: 'pending',
    };
  },

  async processPayment(paymentIntentId: string): Promise<PaymentIntent> {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: paymentIntentId,
      amount: 2500,
      status: 'succeeded',
    };
  },

  async createEscrowAccount(projectId: string): Promise<{ id: string }> {
    // Simulate escrow account creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: 'escrow_' + Math.random().toString(36).substr(2, 9),
    };
  },
};