import { Confirmation } from '../lib/Confirmation';

export const confirmations = {
  items: {} as { [key: number]: Confirmation },
  get(key: number) {
    console.log(this.items[key]);
    return this.items[key];
  },
  push(key: number, item: Confirmation) {
    this.items[key] = item;
    this.setBadge();
  },
  delete(key: number) {
    delete this.items[key];
    this.setBadge();
  },
  count() {
    return Object.keys(this.items).length;
  },
  countStr() {
    return this.count().toString();
  },
  setBadge(): void {
    const text = this.countStr();
    chrome.browserAction.setBadgeText({ text: text === '0' ? '' : text });
  },
};
