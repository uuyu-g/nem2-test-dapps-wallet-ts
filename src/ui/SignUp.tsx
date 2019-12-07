import React, { useRef } from "react";

const SignUp: React.FC = () => {
  const passwordEl = useRef<HTMLInputElement>();
  const privateKeyEl = useRef<HTMLInputElement>();

  function signUp() {
    const background = chrome.extension.getBackgroundPage();
    const pwElm = passwordEl.current;
    const privElm = privateKeyEl.current;
    console.log(pwElm.value, privElm.value);
    background.popup.setInitialAccount(privElm.value, pwElm.value);
  }

  return (
    <div className="p-3">
      <div className="form-group">
        <label htmlFor="input-private-key">Private Key</label>
        <input
          type="text"
          className="form-control"
          id="input-private-key"
          placeholder="Private Key"
          ref={privateKeyEl}
        />
      </div>
      <div className="form-group">
        <label htmlFor="input-password">Password</label>
        <input
          type="password"
          className="form-control"
          id="input-password"
          placeholder="Password"
          ref={passwordEl}
        />
      </div>
      <div className="text-right">
        <button type="button" className="btn btn-primary" onClick={signUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
