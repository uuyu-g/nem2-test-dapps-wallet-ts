interface Window {
  popup: {
    setCallback(cb): void;
    existsAccount(): boolean;
    setInitialAccount(privateKey, password): void;
    existsPassword(): boolean;
    setPassword(str): void;
    getAccountStaticInfo(): {
      address: string;
      endPoint: string;
    };
    getTransactions(): Promise<{ transactions: string[] }>;
    getAccountInfo(): Promise<{ balance: string }>;
  };
  notification: {
    get(tabId: number);
    accept(tabId: number);
    deny(tabId: number);
  };
  nem2: {};
}
