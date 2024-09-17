"use client";
import React, { useState, useEffect, useRef} from "react";
import {
  House,
  Box,
  Truck,
  ChartNoAxesCombined,
  Megaphone,
  Settings,
  Menu,
} from "lucide-react";
import NavItem from "./NavItem";
import IconHome from "../../Home/IconHome";

export default function NavBar() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); 
  const menuRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedItem = localStorage.getItem("activeItem") || "Dashboard";
      setActiveItem(savedItem)
    }
  }, []);

  useEffect(() => {
    if (activeItem !== null && typeof window !== "undefined") {
      localStorage.setItem("activeItem", activeItem);
    }
  }, [activeItem]);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false); // Close the menu if clicked outside
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside); // Listen for clicks
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up listener when menu is closed
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up listener on component unmount
    };
  }, [menuOpen]);

  return (
    <>

        <div className="xl:hidden fixed z-50 w-full h-12 bg-gray-800 flex items-center" onClick={toggleMenu}>
        <div className="ml-3">
        <Menu size={30} color="white"/>
        </div>
        </div>

      {/* Sidebar Navigation */}
      <nav
       ref={menuRef}
        className={`${
          menuOpen ? "block" : "hidden"
        } xl:block w-60 h-screen bg-gray-700 fixed top-0 left-0 transition-transform transform z-50  ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0`}
      >
        <ul className="pt-16 pl-10">

          <NavItem
            icon={activeItem === "Dashboard" ? <IconHome /> : <House />}
            label="Dashboard"
            isActive={activeItem === "Dashboard"}
            onClick={() => handleItemClick("Dashboard")}
            href="/SellerDashboard/Home"
          />

          <NavItem
            icon={<Box />}
            label="Manage Products"
            isActive={activeItem === "Manage Products"}
            onClick={() => handleItemClick("Manage Products")}
            href="/SellerDashboard/Products"
          />

          <NavItem
            icon={<Truck />}
            label="Orders"
            isActive={activeItem === "Orders"}
            onClick={() => handleItemClick("Orders")}
            href="/SellerDashboard/Orders"
          />

          <NavItem
            icon={<ChartNoAxesCombined />}
            label="Analytics"
            isActive={activeItem === "Analytics"}
            onClick={() => handleItemClick("Analytics")}
            href="/SellerDashboard/Analytics"
          />

          <NavItem
            icon={<Megaphone />}
            label="Marketing"
            isActive={activeItem === "Marketing"}
            onClick={() => handleItemClick("Marketing")}
            href="/SellerDashboard/Marketing"
          />

          <NavItem
            icon={<Settings />}
            label="Settings"
            isActive={activeItem === "Settings"}
            onClick={() => handleItemClick("Settings")}
            href="/SellerDashboard/Settings"
          />
        </ul>
      </nav>
    </>
  );
}
