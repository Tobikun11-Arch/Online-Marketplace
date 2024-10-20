"use client"
import useAuth from './SellerDashboard/UseAuth/useAuth';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
    useAuth();
    return <>{children}</>;
}