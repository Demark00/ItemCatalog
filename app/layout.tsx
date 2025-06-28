import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ItemCatalog",
  description: "Manage your product inventory and listings easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" data-theme="light">
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
