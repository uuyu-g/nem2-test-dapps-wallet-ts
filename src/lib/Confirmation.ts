import {
  Transaction,
  InnerTransaction,
  UInt64,
  SignedTransaction,
  TransactionType,
  TransferTransaction,
} from 'nem2-sdk/dist/src/model/model';
import { TransactionHttp } from 'nem2-sdk/dist/src/infrastructure/TransactionHttp';
import { Txs } from './Transactions';

interface Txs {
  createFromPayload(payload: string): Transaction | InnerTransaction;
}

export class Confirmation {
  private transaction: Transaction | InnerTransaction;

  constructor(
    transactionType: TransactionType,
    payload: string,
    private processId: string,
    private tab: chrome.tabs.Tab,
    private sendResponse: (response: any) => void
  ) {
    // this.transaction = (Txs[transactionType] as Txs).createFromPayload(payload);
    this.transaction = TransferTransaction.createFromPayload(payload); // 実装が思いつかないのでトランスファー限定
    (this.transaction as any).maxFee = UInt64.fromUint(20000);
  }

  getTabId(): number {
    return this.tab.id;
  }

  getTransaction(): Transaction | InnerTransaction {
    return this.transaction;
  }

  getTransactionJson(): { transaction: any } {
    return this.transaction.toJSON();
  }

  announce(signed: SignedTransaction, endPoint: string): void {
    const transactionHttp = new TransactionHttp(endPoint);
    transactionHttp
      .announce(signed)
      .toPromise()
      .then(
        () => {
          this.sendResponse({
            result: 'success',
            processId: this.processId,
            data: { transactionHash: signed.hash },
          });
        },
        error => {
          this.sendResponse({
            result: 'fail',
            processId: this.processId,
            error: error.toString(),
          });
        }
      );
  }

  cancel(): void {
    this.sendResponse({
      result: 'fail',
      processId: this.processId,
      error: 'user denied',
    });
  }
}
