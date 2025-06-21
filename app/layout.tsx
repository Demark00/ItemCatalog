"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

// export const metadata: Metadata = {
//   title: "ItemCatalog",
//   description: "Manage your product inventory and listings easily",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, initializeTheme } = useThemeStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);
  return (
    <html lang="en" data-theme={theme}>
      <body
        className={` antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
