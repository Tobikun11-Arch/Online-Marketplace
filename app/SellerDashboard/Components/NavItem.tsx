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
    className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer ${
      isActive ? 'bg-gray-300' : 'hover:bg-gray-200'
    }`}
    onClick={onClick}>
    {icon}
    <span className="font-abc">{label}</span>
  </li>
  </Link>
  )
}
