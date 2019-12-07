import React, { useRef } from "react";

const SignIn: React.FC = () => {
  const passwordEl = useRef<HTMLInputElement>();

  function signIn() {
    const background = chrome.extension.getBackgroundPage();
    const pwElm = passwordEl.current;
    console.log(pwElm.value);
    background.popup.setPassword(pwElm.value);
  }

  return (
    <div className="p-3">
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
        <button type="button" className="btn btn-primary" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
