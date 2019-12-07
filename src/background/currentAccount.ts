import { Password } from 'nem2-sdk/dist/src/model/wallet/Password';
import { wallets } from './wallet';
import { Account } from 'nem2-sdk/dist/src/model/model';

export const currentAccount = {
  index: 0,
  password: null,
  address() {
    return wallets.getAccountByIndex(this.index).address;
  },
  endPoint() {
    return wallets.getNetworkByIndex(this.index).endPoint;
  },
  generationHash() {
    return wallets.getNetworkByIndex(this.index).generationHash;
  },
  networkType() {
    return wallets.getNetworkByIndex(this.index).networkType;
  },
  currencyMosaicId() {
    return wallets.getNetworkByIndex(this.index).currencyMosaicId;
  },
  cancel(confirmation) {
    confirmation.cancel();
  },
  announce(confirmation) {
    const signedTransaction = wallets
      .getSigner(this.index, this.password)
      .sign(confirmation.getTransaction(), this.generationHash());
    confirmation.announce(signedTransaction, this.endPoint());
  },
  setPassword(str: string) {
    this.password = new Password(str);
    this.sendMessageToPopup({ existsPassword: true });
    this.sendMessageToNotification({ existsPassword: true });
  },
  addAccount(name, encryptedKey, iv, address) {
    wallets.addAccount({
      name,
      encryptedKey,
      iv,
      address,
    });
    this.sendMessageToPopup({ existsAccount: true });
    this.sendMessageToNotification({ existsAccount: true });
  },
  existsAccount() {
    return wallets.existsAccount();
  },
  existsPassword() {
    return !!this.password;
  },
  sendMessageToPopup: (arg: any) => {},
  sendMessageToNotification: (arg: any) => {},
  setSendMessageToPopup(cb) {
    this.sendMessageToPopup = cb;
  },
  setSendMessageToNotification(cb) {
    this.sendMessageToNotification = cb;
  },
};
