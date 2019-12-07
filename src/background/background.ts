import { wallets } from './wallet';
import { popup } from './window.popup';
import { currentAccount } from './currentAccount';
import { confirmations } from './confirmations';
import { Confirmation } from '../lib/Confirmation';
import { TransactionType } from 'nem2-sdk/dist/src/model/model';

type Action = {
  method:
    | 'sendTransaction'
    | 'beforePageLoad'
    | 'getAddress'
    | 'getNetworkType';
  processId: string;
  data?: {
    payload: any;
    type: TransactionType;
  };
};

chrome.runtime.onMessage.addListener(
  (request: Action, sender, sendResponse) => {
    console.log('background', request);
    switch (request.method) {
      case 'sendTransaction':
        chrome.tabs.create(
          {
            url: 'notification.html',
            active: true,
          },
          tab => {
            console.log('tab opened', tab);
            confirmations.push(
              tab.id,
              new Confirmation(
                request.data.type,
                request.data.payload,
                request.processId,
                tab,
                sendResponse
              )
            );
          }
        );
        break;
      case 'beforePageLoad':
        sendResponse({
          existsAccount: currentAccount.existsAccount(),
          existsPassword: currentAccount.existsPassword(),
        });
        break;
      case 'getAddress':
        sendResponse({
          result: 'success',
          data: currentAccount.address(),
          processId: request.processId,
        });
      case 'getNetworkType':
        sendResponse({
          result: 'success',
          data: currentAccount.networkType(),
          processId: request.processId,
        });
    }
    return true;
  }
);

window.popup = popup;

window.notification = {
  get(tabId) {
    const conf = confirmations.get(tabId);
    if (conf === undefined) {
      return;
    }
    return conf.getTransactionJson();
  },
  accept(tabId) {
    const conf = confirmations.get(tabId);
    if (conf === undefined) {
      return;
    }
    currentAccount.announce(conf);
    confirmations.delete(tabId);
  },
  deny(tabId) {
    const conf = confirmations.get(tabId);
    if (conf === undefined) {
      return;
    }
    currentAccount.cancel(conf);
    confirmations.delete(tabId);
  },
};

const accountsStorage = window.localStorage.getItem('accounts');
if (accountsStorage) {
  console.log('accountsStorage', accountsStorage);
  wallets.setAccounts(JSON.parse(accountsStorage));
}
