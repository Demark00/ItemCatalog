"use client";

import { useThemeStore } from "@/stores/themeStore";
import { THEMES } from "../constants/themes";
import { Boxes } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="container mx-auto px-4 pt-20 max-w-5xl" style={{ height: "100%" }}>
      <div className="space-y-6">
        {/* Theme Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme Settings</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your dashboard and item interface
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Interface Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto space-y-4">
              {/* Mock Item Card */}
              <div className="card bg-base-100 shadow-md" data-theme={theme}>
                <figure className="h-40 bg-base-300 flex items-center justify-center">
                  <Boxes className="w-10 h-10 text-primary" />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-base">Nike Running Shoes</h2>
                  <p className="text-sm text-base-content/70">
                    Lightweight and breathable shoes perfect for running and gym use.
                  </p>
                  <div className="card-actions justify-end mt-2">
                    <button className="btn btn-sm btn-primary">Enquire</button>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-base-content/60">
                This is a sample item preview with the selected theme
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
