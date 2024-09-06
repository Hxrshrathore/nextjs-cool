"use client";
import React, { useState, useEffect } from "react";
import { Label } from "../components/ui/label";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
import { FloatingDock } from "../components/ui/floating-dock";
import { FollowerPointerCard } from "../components/ui/following-pointer";
import { IconHome, IconSettings } from "@tabler/icons-react";
import { cn } from "../lib/utils";

export default function SettingsPage() {
  const [theme, setTheme] = useState("Dark");
  const [notifications, setNotifications] = useState("Enabled");
  const [privacy, setPrivacy] = useState("Public");
  const [language, setLanguage] = useState("English");

  // Load settings from localStorage when the component mounts
  useEffect(() => {
    const savedSettings = localStorage.getItem('settings');
    if (savedSettings) {
      const { theme, notifications, privacy, language } = JSON.parse(savedSettings);
      setTheme(theme);
      setNotifications(notifications);
      setPrivacy(privacy);
      setLanguage(language);
    }
  }, []);

  // Apply theme settings
  useEffect(() => {
    if (theme === "Dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else if (theme === "Light") {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  // Simulate enabling/disabling notifications
  useEffect(() => {
    if (notifications === "Enabled") {
      console.log("Notifications enabled");
      // Add logic to enable your notification system
    } else {
      console.log("Notifications disabled");
      // Add logic to disable your notification system
    }
  }, [notifications]);

  // Simulate privacy settings
  useEffect(() => {
    if (privacy === "Public") {
      console.log("Privacy set to Public");
      // Implement logic to make user data public
    } else if (privacy === "Private") {
      console.log("Privacy set to Private");
      // Implement logic to make user data private
    } else {
      console.log("Custom privacy settings applied");
      // Implement custom privacy logic
    }
  }, [privacy]);

  // Simulate language change
  useEffect(() => {
    console.log(`Language set to ${language}`);
    // Implement logic to change the language of the application
  }, [language]);

  // Save settings to localStorage
  const handleSave = (e) => {
    e.preventDefault();
    const settings = { theme, notifications, privacy, language };
    localStorage.setItem('settings', JSON.stringify(settings));
    console.log("Settings saved", settings);
  };

  const dockItems = [
    { title: 'Home', icon: <IconHome />, href: '/' },
    { title: 'Settings', icon: <IconSettings />, href: '/settings' },
  ];

  return (
    <FollowerPointerCard className="min-h-screen flex flex-col items-center justify-between bg-black text-white font-poppins">
      <Navbar className="top-4 mb-20" />  {/* Adjusted padding and margin */}

      <div className="w-full max-w-md mx-auto mt-16 mb-20 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Settings
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Customize your preferences
        </p>

        <form className="my-8" onSubmit={handleSave}>
          <div className="flex flex-col space-y-10">
            <LabelInputContainer>
              <Label htmlFor="theme">Theme</Label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="h-10 w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-sm"
              >
                <option value="Dark">Dark</option>
                <option value="Light">Light</option>
                <option value="System">System</option>
              </select>
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="notifications">Notifications</Label>
              <select
                id="notifications"
                value={notifications}
                onChange={(e) => setNotifications(e.target.value)}
                className="h-10 w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-sm"
              >
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </select>
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="privacy">Privacy</Label>
              <select
                id="privacy"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
                className="h-10 w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-sm"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Custom">Custom</option>
              </select>
            </LabelInputContainer>

            <LabelInputContainer className="mb-6">
              <Label htmlFor="language">Language</Label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="h-10 w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-sm"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Save Settings &rarr;
              <BottomGradient />
            </button>
          </div>
        </form>
      </div>

      <footer className="w-full py-4 bg-opacity-50 backdrop-blur-lg bg-black text-white text-center z-40">
        <hr className="mb-4 border-neutral-800" />
        <p>
          coded with <span className="text-red-500">❤️</span> by
          <a href="https://hxrshrathore.me" className="ml-1 text-blue-400 hover:underline">Harsh</a>
        </p>
      </footer>

      <FloatingDock
        items={dockItems}
        desktopClassName="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50" // Moved up by increasing bottom padding
        mobileClassName="fixed bottom-20 right-4 z-50" // Moved up by increasing bottom padding
      />
    </FollowerPointerCard>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(
      "relative group/btn flex flex-col space-y-2 w-full p-[2px] rounded-lg transition duration-300",
      className
    )}>
      {children}
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full bottom-0 inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto bottom-0 inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </div>
  );
};

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed pt-20 top-0 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs, and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
