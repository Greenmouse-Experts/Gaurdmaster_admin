declare module "@paystack/inline-js" {
  interface ResumeCallbacks {
    onSuccess?: (transaction: {
      id: number;
      reference: string;
      message: string;
    }) => void;
    onLoad?: (transaction: { id: number; accessCode: string }) => void;
    onCancel?: () => void;
    onError?: (error: { message: string }) => void;
  }

  export default class PaystackPop {
    isLoaded(): boolean;
    resumeTransaction(accessCode: string, callbacks?: ResumeCallbacks): unknown;
    newTransaction(options: Record<string, unknown>): unknown;
    cancelTransaction(idOrTransaction: unknown): void;
  }
}
