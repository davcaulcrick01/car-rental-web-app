declare module '@stripe/stripe-js' {
  export interface StripeCheckoutOptions {
    sessionId: string;
  }

  export interface Stripe {
    redirectToCheckout(options: StripeCheckoutOptions): Promise<{ error?: { message: string } }>;
  }

  export function loadStripe(publishableKey: string): Promise<Stripe | null>;
} 