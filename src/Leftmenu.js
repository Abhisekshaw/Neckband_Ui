import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Leftmenu({ isSideMenuOpen }) {
  const [selectedItem, setSelectedItem] = useState({
    CurrentReport: false,
    PreviousReport: false,
  });
  const [sessionTimeout, setSessionTimeout] = useState([]);


  const handleItemClick = (itemName) => {
    setSelectedItem({
      CurrentReport: false,
      PreviousReport: false,
      [itemName]: true,
    });
  };

  const renderSpanForItem = (itemName) => {
    return selectedItem[itemName] ? (
      <span
        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
        aria-hidden="true"
      ></span>
    ) : null;
  };

  return (
    <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSideMenuOpen ? "overflow-hidden" : ""}`}>
      {sessionTimeout}
      <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link className="text-lg font-bold text-gray-800 dark:text-gray-200" to="/home">
            <h2 className="text-2xl font-bold text-gray-800 ml-5 dark:text-gray-200">NECKBAND</h2>
          </Link>
          <ul className="mt-6">
            <li className="relative px-6 py-3" onClick={() => handleItemClick("CurrentReport")}>
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="/home"
              >
                {renderSpanForItem("CurrentReport")}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                <span className="ml-4">Current Report</span>
              </Link>
            </li>
            {/* <li className="relative px-6 py-3" onClick={() => handleItemClick("PreviousReport")}>
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="/home"
              >
                {renderSpanForItem("PreviousReport")}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                <span className="ml-4">Previous Report</span>
              </Link>
            </li> */}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Leftmenu;
