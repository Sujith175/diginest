import React from "react";
import Sidebar from "../components/Sidebar";
import MediaManagement from "./MediaManagement";

const HomePage = () => {
  return (
    <div className="app">
      <Sidebar />
      <MediaManagement />
    </div>
  );
};

export default HomePage;
