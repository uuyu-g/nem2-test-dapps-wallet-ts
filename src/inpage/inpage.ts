console.log('inpage loading');

import LocalMessageDuplexStream from 'post-message-stream';
import { Transaction } from 'nem2-sdk/dist/src/model/model';

const contentStream = new LocalMessageDuplexStream({
  name: 'zskmgbd0e32f5siy5ua973kqush6xxk5qd0hg3f2',
  target: 'nw6i519ganfrhq8ax05v215txcor9rtk5rpcxcfz',
});

let contentStreamQueue = {};

contentStream.on('data', data => {
  console.log(data);
  const item = contentStreamQueue[data.processId];
  if (item === undefined) {
    return;
  }
  if (data.result === 'success') {
    item.resolve(data.data);
  } else {
    item.reject(data.error);
  }
  delete contentStreamQueue[data.processId];
});

window.nem2 = {
  sendTransaction(transaction: Transaction) {
    console.log('[tx data]', transaction.type);

    const processId = getRandomId();
    contentStream.write({
      method: 'sendTransaction',
      processId,
      data: {
        payload: transaction.serialize(),
        type: transaction.type,
      },
    });
    return new Promise((resolve, reject) => {
      contentStreamQueue[processId] = {
        resolve,
        reject,
      };
    });
  },
  getAddress(): Promise<string> {
    console.log('address');
    const processId = getRandomId();
    contentStream.write({
      method: 'getAddress',
      processId,
    });
    return new Promise((resolve, reject) => {
      contentStreamQueue[processId] = {
        resolve,
        reject,
      };
    });
  },
  getNetworkType(): Promise<number> {
    console.log('networkType');
    const processId = getRandomId();
    contentStream.write({
      method: 'getNetworkType',
      processId,
    });
    return new Promise((resolve, reject) => {
      contentStreamQueue[processId] = {
        resolve,
        reject,
      };
    });
  },
  getGenerationHash() {
    console.log('generationHash');
    const processId = getRandomId();
    contentStream.write({
      method: 'getGenerationHash',
      processId,
    });
    return new Promise((resolve, reject) => {
      contentStreamQueue[processId] = {
        resolve,
        reject,
      };
    });
  },
};

function getRandomId(): string {
  const min = 0;
  const max = 999999999;
  const random = Math.floor(Math.random() * (max - min)) + min;
  return random.toString() + Date.now().toString();
}
