"use client";
import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function SideBarFooter() {
  const router = useRouter();
  const options = [
    {
      name: "Settings",
      icon: Settings,
      path: "/settings", // Path for Settings
    },
    {
      name: "Help Center",
      icon: HelpCircle,
      path: "/HelpCenter", // Path for Help Center
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing", // Path for My Subscription
    },
    {
      name: "Sign Out",
      icon: LogOut,
      // No path, this will trigger sign out logic
    },
  ];

  const onOptionClick = (option) => {
    console.log(option);
    if (option.path) {
      router.push(option.path); // Navigate if path exists
    } else if (option.name === "Sign Out") {
      // Handle sign out logic here
      console.log("Signing out...");
      // You might want to clear user session, cookies, or token
      localStorage.removeItem("user"); // Example for removing user data from localStorage

      // Optionally redirect to the login page after sign-out
      router.push("/login");
    }
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          className="w-full flex justify-start my-3 text-gray-300 bg-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-pink-500 transition duration-300"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;
