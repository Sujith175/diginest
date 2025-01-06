import React from "react";
import { FaBell } from "react-icons/fa";

import bMan from "../images/businessman.jpeg";
const Header = () => {
  return (
    <header>
      <h2>Media Management</h2>
      <div className="profile-items">
        <div>
          <h5>Admin</h5>
          <span>admin@admin</span>
        </div>
        <div className="image-container">
          <img src={bMan} alt="profile" className="profile-image" />
        </div>
        <div className="bell-icon">
          <FaBell />
        </div>
      </div>
    </header>
  );
};

export default Header;
