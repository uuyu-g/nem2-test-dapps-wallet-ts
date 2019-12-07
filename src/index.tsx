import React, { useState, useRef, Component } from "react";
import ReactDOM from "react-dom";
import ErrorBoundary from "./ui/ErrorBoundary";
import Header from "./ui/Header";
import SignUp from "./ui/SignUp";
import SignIn from "./ui/SignIn";
import Account from "./ui/Account";

type State = Partial<{
  existsAccount: boolean;
  existsPassword: boolean;
}>;

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    const background = chrome.extension.getBackgroundPage();
    this.state = {
      existsAccount: background.popup.existsAccount(),
      existsPassword: background.popup.existsPassword()
    };
    background.popup.setCallback(state => {
      this.setState(state);
    });
  }

  login() {
    if (this.state.existsAccount) {
      if (this.state.existsPassword) {
        return <Account />;
      }
      return <SignIn />;
    }
    return <SignUp />;
  }

  render() {
    return (
      <ErrorBoundary>
        <Header />
        {this.login()}
      </ErrorBoundary>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("popup"));
