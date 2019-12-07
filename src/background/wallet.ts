import { NetworkType } from 'nem2-sdk/dist/src/model/blockchain/NetworkType';
import { Account } from 'nem2-sdk/dist/src/model/account/Account';
import { EncryptedPrivateKey, Password } from 'nem2-sdk/dist/src/model/model';

type WalletAccount = {
  name: string;
  encryptedKey: string;
  iv: string;
  address: string;
};

type Network = {
  endPoint: string;
  currencyMosaicId: string;
  generationHash: string;
  networkType: NetworkType;
};

export const wallets = {
  accounts: [] as WalletAccount[],
  networks: [
    {
      endPoint: 'http://api-harvest-01.ap-northeast-1.nemtech.network:3000',
      currencyMosaicId: '46BE9BC0626F9B1A',
      generationHash:
        '6C0350A10724FC325A1F06CEFC4CA14464BC472F566842D22418AEE0F8746B4C',
      networkType: NetworkType.TEST_NET,
    },
  ],
  getSigner(index: number, password: Password): Account {
    const { encryptedKey, iv } = this.getAccountByIndex(index);
    const { networkType } = this.getNetworkByIndex(index);
    const enkey = new EncryptedPrivateKey(encryptedKey, iv);
    const pkey = enkey.decrypt(password);
    return Account.createFromPrivateKey(pkey, networkType);
  },
  getAccountByIndex(index: number): WalletAccount {
    return this.accounts[index];
  },
  getNetworkByIndex(index: number): Network {
    return this.networks[index];
  },
  setAccounts(accounts: WalletAccount[]) {
    this.accounts = accounts;
  },
  addAccount(account: WalletAccount) {
    this.accounts.push(account);
    window.localStorage.setItem('accounts', JSON.stringify(this.accounts));
  },
  existsAccount(): boolean {
    return this.accounts.length !== 0;
  },
};
