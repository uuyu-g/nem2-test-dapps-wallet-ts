import React from "react";

const Header: React.FC = ({}) => {
  return (
    <div className="d-flex justify-content-between align-items-center border-bottom">
      <div style={{ width: "50px" }}>
        <img src="images/nem_logo_WEB.png" className="w-100" alt="symbol" />
      </div>
      <div>nem2-test-dapps-wallet-ts</div>
      <div className="text-center" style={{ width: "50px" }}>
        &#x2699;
      </div>
    </div>
  );
};
export default Header;
