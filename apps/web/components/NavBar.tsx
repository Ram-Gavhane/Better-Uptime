"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LucideShieldCheck, LucideLogOut } from "lucide-react";

export function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return (
    <nav className="border-b border-border bg-background/70 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold tracking-tight">
          <LucideShieldCheck className="h-6 w-6 text-primary" />
          <span>Better Uptime</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
        >
          <LucideLogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </nav>
  );
}
