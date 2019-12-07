import React, { useEffect, useState } from 'react';

const Account: React.FC = ({}) => {
  const background = chrome.extension.getBackgroundPage();

  const [balance, setBalance] = useState('0');
  const [transactions, setTransactions] = useState(['']);
  const { address, endPoint } = background.popup.getAccountStaticInfo();

  useEffect(() => {
    background.popup.getAccountInfo().then(({ balance }) => {
      const decimalPart = ('000000' + balance).substr(-6);
      const integerPart = balance.substring(0, balance.length - 6);
      setBalance(`${integerPart}.${decimalPart}`);
    });
    // うまく動いてない
    background.popup.getTransactions().then(({ transactions }) => {
      console.log(transactions);

      setTransactions(transactions);
    });
  }, []);

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });

  function onClickMoreTx(event) {
    event.preventDefault();
    chrome.tabs.create({
      url: `${endPoint}/account/${address.replace(/-/g, '')}/transactions`,
      active: true,
    });
  }

  function onClickCopyAddress(event) {
    const elm = document.getElementById('copy-address');
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elm);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
  }

  return (
    <div>
      <div className="text-center px-5">
        <button
          type="button"
          className="btn btn-light"
          data-toggle="tooltip"
          data-placement="bottom"
          title="Copy"
          style={{ lineHeight: 1 }}
          onClick={onClickCopyAddress}
        >
          <span className="text-address" style={{ fontSize: '80%' }}>
            {address}
          </span>
        </button>
      </div>

      <div className="px-3 mt-4">
        <div className="card">
          <div className="card-body pt-0 pb-4">
            <div className="card-title">
              <span style={{ fontSize: '80%' }}>Balance</span>
            </div>
            <div className="card-text d-flex justify-content-between align-items-baseline px-3">
              <h5>{balance}</h5>
              <div>xem</div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 mt-3">
        <div className="card">
          <div className="card-body pt-0 pb-2">
            <div className="card-title">
              <span style={{ fontSize: '80%' }}>Transactions</span>
            </div>
            <div className="card-text px-2 transactions-container">
              {transactions.map((tx, index) => {
                return (
                  <div
                    className="text-truncate"
                    style={{ fontSize: '50%' }}
                    key={index}
                  >
                    {tx}
                  </div>
                );
              })}
            </div>
            <div className="text-right">
              <a href="#" style={{ fontSize: '80%' }} onClick={onClickMoreTx}>
                more
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-3 dropup">
        <button
          type="button"
          className="btn btn-light rounded-pill btn-sm border"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <small className="font-weight-bold">{endPoint}</small>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <button className="dropdown-item" type="button">
            https://elephant3.48gh23s.xyz:3001
          </button>
        </div>
      </div>
      <div className="text-center px-3 mt-3">
        <div className="alert alert-danger font-weight-bold">
          experimental use only
        </div>
      </div>

      <div
        id="copy-address"
        className="text-address text-center text-white"
        style={{ fontSize: '10%' }}
      >
        {address}
      </div>
    </div>
  );
};
export default Account;
