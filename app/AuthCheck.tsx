"use client"
import useAuth from './SellerDashboard/UseAuth/useAuth';

export default function AuthCheck({ children, className }: { children: React.ReactNode, className?: string }) {
    useAuth()
    return <><main className={className}>{children}</main></>;
}