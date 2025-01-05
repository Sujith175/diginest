import React from "react";
import { GrGallery } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">Right Med</div>
      <ul className="menu">
        <li className="menu-item ">
          <GrGallery />
          &nbsp; Media Management
        </li>
      </ul>
      <button className="logout-button">
        <CiLogout size={20} />
        &nbsp; Logout
      </button>
    </div>
  );
};

export default Sidebar;
