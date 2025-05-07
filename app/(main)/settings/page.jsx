"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import React, { useContext, useEffect, useState } from "react";

function SettingsPage() {
  const { userDetail } = useContext(UserDetailContext);
  const [tokensLeft, setTokensLeft] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fetch token and user information when the component is mounted
  useEffect(() => {
    if (userDetail) {
      setTokensLeft(userDetail?.token); // Assuming userDetail contains token data
    }

    // Check for user's system theme preference or localStorage value
    const userPrefersDark = window.localStorage.getItem("theme") === "dark";
    setIsDarkMode(userPrefersDark);

    // Set body class based on the dark mode
    if (userPrefersDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [userDetail]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    window.localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 dark:text-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
        Settings
      </h2>

      {/* User Info Card */}
      <div className="space-y-6 mb-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              User Info
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {userDetail?.name || "No user info"}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Email
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {userDetail?.email || "No email info"}
            </p>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Tokens Left
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {tokensLeft} Tokens
            </p>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle Button */}
      <div className="text-center">
        <button
          onClick={toggleDarkMode}
          className="w-full md:w-auto mt-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform active:scale-95"
        >
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
