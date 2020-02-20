import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/VotePage">
        <p>VOTER</p>
      </Link>
      <Link to="/ClassementPage">
        <p>LE CLASSEMENT</p>
      </Link>
    </div>
  );
};

export default Menu;
