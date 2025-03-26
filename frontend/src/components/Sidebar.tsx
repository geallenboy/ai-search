"use client";
import { useState } from "react";
import { BookOpenText, Home, Search, Settings, SquareIcon } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import SettingsDialog from "./SettingsDialog";
import Layout from "@/components/Layout";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const segments = useSelectedLayoutSegments();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navLinks = [
    {
      icon: Home,
      href: "/",
      active: segments.length === 0,
      label: "Home",
    },
    {
      icon: Search,
      href: "/",
      active: segments.includes("discover"),
      label: "Discover",
    },
    {
      icon: BookOpenText,
      href: "/",
      active: segments.includes("library"),
      label: "Library",
    },
  ];

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-20 lg:flex-col">
        <div className="flex grow flex-col items-center justify-between gap-y-5 overflow-y-auto bg-[#111111] px-2 py-8">
          <a href="/">
            <SquareIcon className="text-white cursor-pointer" />
          </a>
          <div className="flex flex-col items-center gap-y-3 w-full">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`
                            relative flex flex-row items-center cursor-pointer hover:bg-white/10 hover:text-white duration-150 transition w-full py-2 rounded-lg ${
                              link.active ? "text-white" : "text-white/70"
                            }`}
              >
                <link.icon />
                {link.active && (
                  <div className="absolute right-0 -mr-2 h-full w-1 rounded-l-lg bg-white" />
                )}
              </Link>
            ))}
          </div>
          <Settings
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="text-white cursor-pointer"
          />
          <SettingsDialog
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
          />
        </div>
      </div>

      <div className="fixed bottom-0 flex flex-row w-full z-50 items-center gap-x-6 bg-[#111111] px-4 py-4 shadow-sm lg:hidden">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`
                    relative flex flex-col items-center space-y-1 text-center w-full ${
                      link.active ? "text-white" : "text-white/70"
                    }`}
          >
            {link.active && (
              <div className="absolute top-0 -mt-4 w-full h-1 rounded-l-lg bg-white" />
            )}
            <link.icon />
            <p className="text-xs">{link.label}</p>
          </Link>
        ))}
      </div>
      <Layout>{children}</Layout>
    </div>
  );
};

export default Sidebar;
