import { currentAccount } from './currentAccount';
import { SimpleWallet } from 'nem2-sdk/dist/src/model/wallet/SimpleWallet';
import { Password } from 'nem2-sdk/dist/src/model/wallet/Password';
import {
  NetworkHttp,
  AccountHttp,
} from 'nem2-sdk/dist/src/infrastructure/infrastructure';
import { Address } from 'nem2-sdk/dist/src/model/account/Address';
import { UInt64 } from 'nem2-sdk/dist/src/model/UInt64';

export const popup = {
  setCallback(cb): void {
    currentAccount.setSendMessageToPopup(cb);
  },
  existsAccount(): boolean {
    return currentAccount.existsAccount();
  },
  setInitialAccount(privateKey, password): void {
    console.log(privateKey, password);
    let simpleWallet = SimpleWallet.createFromPrivateKey(
      'Account 1',
      new Password(password),
      privateKey,
      currentAccount.networkType()
    );
    currentAccount.addAccount(
      'Account 1',
      simpleWallet.encryptedPrivateKey.encryptedKey,
      simpleWallet.encryptedPrivateKey.iv,
      simpleWallet.address.pretty()
    );
    this.setPassword(password);
    simpleWallet = undefined;
  },
  existsPassword(): boolean {
    return currentAccount.existsPassword();
  },
  setPassword(str): void {
    currentAccount.setPassword(str);
  },
  getAccountStaticInfo(): { address: any; endPoint: any } {
    return {
      address: currentAccount.address(),
      endPoint: currentAccount.endPoint(),
    };
  },
  async getTransactions(): Promise<{ transactions: string[] }> {
    const address = currentAccount.address();
    const url = currentAccount.endPoint();
    const networkHttp = new NetworkHttp(url);
    const accountHttp = new AccountHttp(url, networkHttp);
    return accountHttp
      .getAccountTransactions(Address.createFromRawAddress(address))
      .toPromise()
      .then(
        transactions => {
          const tx4 = transactions.slice(0, 4).map(t => t.transactionInfo.hash);
          return {
            transactions: [...tx4, '', '', '', ''].slice(0, 4),
          };
        },
        e => {
          return {
            transactions: ['', '', '', ''],
          };
        }
      );
  },
  async getAccountInfo(): Promise<{ balance: string }> {
    const address = currentAccount.address();
    const url = currentAccount.endPoint();
    const networkHttp = new NetworkHttp(url);
    const accountHttp = new AccountHttp(url, networkHttp);
    return accountHttp
      .getAccountInfo(Address.createFromRawAddress(address))
      .toPromise()
      .then(
        accountInfo => {
          const mosaic = accountInfo.mosaics.find(mosaic => {
            return mosaic.id.id.equals(
              UInt64.fromHex(currentAccount.currencyMosaicId())
            );
          });
          return {
            balance: mosaic ? mosaic.amount.toString() : '0',
          };
        },
        e => {
          return {
            balance: '0',
          };
        }
      );
  },
};
