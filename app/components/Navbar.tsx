"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import { LogOut, ShoppingBasket, User, Settings } from "lucide-react";
import { AuthStore } from "@/types/user-type";

const Navbar = () => {
  const { logout, authUser, checkAuth } = useAuthStore() as AuthStore;

  useEffect(() => {
    const hasToken = document.cookie.includes("jwt=");
    if (hasToken) {
      checkAuth();
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur-lg shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
              <ShoppingBasket className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-base-content">
              ItemCatalog
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-4 ml-auto">
          <Link
            href="/"
            className="btn btn-sm btn-outline gap-2 shadow-sm hover:shadow-md transition"
          >
            <User className="size-4" />
            <span className="hidden sm:inline">Add Items</span>
          </Link>

          <Link
            href="/viewItems"
            className="btn btn-sm btn-outline gap-2 shadow-sm hover:shadow-md transition"
          >
            <User className="size-4" />
            <span className="hidden sm:inline">View Items</span>
          </Link>

          {authUser ? (
            <>
              <Link
                href="/settings"
                className="btn btn-sm btn-outline gap-2 shadow-sm hover:shadow-md transition"
              >
                <Settings className="size-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                onClick={logout}
                className="btn btn-sm btn-outline gap-2 shadow-sm hover:shadow-md transition"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/settings"
                className="btn btn-sm btn-outline gap-2 shadow-sm hover:shadow-md transition"
              >
                <Settings className="size-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <Link
                href="/login"
                className="btn btn-sm btn-outline gap-2 shadow-sm hover:shadow-md transition"
              >
                <User className="size-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
