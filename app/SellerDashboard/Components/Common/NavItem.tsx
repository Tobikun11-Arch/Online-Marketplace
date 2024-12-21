import Link from 'next/link';
import React from 'react'

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  href: string; 
}

export default function NavItem({icon, label, isActive, onClick, href}: NavItemProps) {
  return (
    <Link href={href}>
    <li
    className={`flex items-center gap-2 p-3 rounded-tl-lg rounded-bl-lg cursor-pointer ${
      isActive ? 'bg-white dark:text-black' : 'hover:bg-gray-950 text-white'
    }`}
    onClick={onClick}>
    {icon}
    <span className="font-abc">{label}</span>
  </li>
  </Link>
  )
}
