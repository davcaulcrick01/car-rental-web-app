declare module '@stripe/stripe-js' {
  export interface Stripe {
    // Add any Stripe types you're using
  }

  export function loadStripe(publishableKey: string): Promise<Stripe | null>;
} 