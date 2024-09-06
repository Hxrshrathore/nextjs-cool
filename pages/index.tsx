// "use client" ensures the file is treated as a client-side React component
"use client";

// Importing necessary React, state management, and UI components
import React, { useState } from "react";
import { motion } from "framer-motion"; // Motion library for animations
import { 
  HoveredLink, 
  Menu, 
  MenuItem, 
  ProductItem 
} from "../components/ui/navbar-menu"; // Custom navbar components
import { FileUpload } from "../components/ui/file-upload"; // File upload component
import { FloatingDock } from "../components/ui/floating-dock"; // Floating dock UI component
import { FollowerPointerCard } from "../components/ui/following-pointer"; // Pointer-following card component
import { LampContainer } from "../components/ui/lamp"; // Lamp UI container
import { cn } from "../lib/utils"; // Utility functions for conditional class names
import { IconHome, IconSettings } from "@tabler/icons-react"; // Icons from Tabler Icons
import { Button } from "../components/ui/moving-border"; // Custom moving-border button component
import { Cover } from "../components/ui/cover"; // Cover component for animations
import { Spotlight } from "../components/ui/spotlight"; // Spotlight animation component
import { MacbookScroll } from "../components/ui/macbook-scroll"; // MacBook scrolling animation component
import { useScroll, animate } from "framer-motion"; // Hook and animation utility from Framer Motion
import { StickyScroll } from "../components/ui/sticky-scroll-reveal"; // Sticky scroll reveal component
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input"; // Custom input component
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight"; // Hero section highlighting component

// Main HomePage Component
export default function HomePage() {
  // State for managing active links
  const [active, setActive] = useState<string | null>(null);

  // List of items for the floating dock navigation
  const dockItems = [
    { title: 'Home', icon: <IconHome />, href: '/' },
    { title: 'Settings', icon: <IconSettings />, href: '/settings' },
  ];

  // Function to scroll to a specific section by its ID
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      animate(document.scrollingElement || document.documentElement.scrollTop, element.offsetTop, {
        type: "spring",
        stiffness: 50,
        damping: 20,
      });
    }
  };

  return (
    // Main card for the follower pointer effect
    <FollowerPointerCard className="min-h-screen flex flex-col items-center justify-center bg-black text-white font-poppins">
      
      {/* Navbar section */}
      <Navbar className="top-2" />

      {/* Spotlight Section */}
      <SpotlightPreview />

      {/* Hero Section with Lamp Component */}
      <LampContainer className="w-full">
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-white/80 to-gray-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Sshhhh!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 text-center text-lg md:text-2xl text-white/70"
        >
          We are about to take off!🚀.
        </motion.p>
      </LampContainer>

      {/* Moving Border Demo Section */}
      <MovingBorderDemo onClick={() => scrollToSection('cover-demo')} />

      {/* Cover Demo Section */}
      <div id="cover-demo">
        <CoverDemo />
      </div>

      {/* MacBook Scroll Demo Section */}
      <div className="container mx-auto px-4 overflow-hidden">
        <MacbookScroll />
      </div>

      {/* Padding to space out the sections */}
      <div className="pb-32"></div>

      {/* Sticky Scroll Reveal Demo Section */}
      <StickyScrollDemo />

      {/* Placeholders and Vanishing Input Section */}
      <PlaceholdersAndVanishInputD />

      {/* Hero Highlight Demo Section */}
      <HeroHighlightDemo />

      {/* File Upload Section */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 pb-32 relative z-50">
        <h2 className="text-3xl font-bold mb-8">Upload Your File</h2>
        <FileUpload />
      </main>

      {/* Footer Section */}
      <footer className="w-full py-4 bg-opacity-50 backdrop-blur-lg bg-black text-white text-center z-50">
        <hr className="mb-4 border-neutral-800" />
        <p>
          Coded with <span className="text-red-500">❤️</span> by
          <a href="https://hxrshrathore.me" className="ml-1 text-blue-400 hover:underline">Harsh</a>
        </p>
      </footer>

      {/* Floating Dock Navigation */}
      <FloatingDock items={dockItems} desktopClassName="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50" mobileClassName="fixed bottom-12 right-4 z-50" />
    </FollowerPointerCard>
  );
}

// Moving Border Button Demo
function MovingBorderDemo({ onClick }: { onClick: () => void }) {
  return (
    <motion.div className="h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Button
        onClick={onClick}
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Move with the Code Flow
      </Button>
    </motion.div>
  );
}

// Cover Section Demo
function CoverDemo() {
  return (
    <motion.div className="h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Hold tight! We’re about to <Cover>START</Cover> something epic.
      </h1>
    </motion.div>
  );
}

// Navbar Component with Menu Items
function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed pt-8 top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
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
              description="Production-ready Tailwind CSS components for your next project"
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

// Spotlight Section
export function SpotlightPreview() {
  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center p-8 bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          You just found a<br /> Hidden Talent.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto">
          Not to flex, but I’m that web developer who gets things done. Whether it's building apps or crafting stunning UI/UX, this talent is about to blow up.
        </p>
      </div>
    </motion.div>
  );
}

// Sticky Scroll Demo Section
export function StickyScrollDemo() {
  const content = [
  {
    title: "Collaborative Coding",
    description:
      "Real-time coding with the squad. Drop the endless Git pushes, and collaborate like a boss. Whether you're working solo or mobbing with a team, my code brings everyone together.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Collaborative Coding
      </div>
    ),
  },
  {
    title: "Real-time Flex",
    description:
      "Changes? Done. Iterations? Handled. My builds track updates in real-time, because who has time for refreshes? Just smooth, uninterrupted workflows that’ll make you feel like a pro.",
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="real-time updates demo"
        />
      </div>
    ),
  },
  {
    title: "Version Control - No Stress",
    description:
      "Code without the mess. Keep your versions clean, organized, and always up-to-date. My systems are all about clarity—no more spaghetti code chaos. Just clean versioning that keeps your project sharp.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Version Control
      </div>
    ),
  },
  {
    title: "Savage Speed",
    description:
      "Speed matters. My code? Lightning-fast. Blink and you’ll miss it. We don’t do slow over here, only full-throttle dev. Ready to rev up your site?",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Savage Speed
      </div>
    ),
    },
  {
    title: "",
    description:
      "",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        
      </div>
    ),
  },
];


  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}

// Vanishing Input Demo Section
export function PlaceholdersAndVanishInputD() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 text-xl text-center text-white">
        Ask Aceternity UI Anything
      </h2>
      <PlaceholdersAndVanishInput
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}

// Hero Highlight Section
export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-black max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        With insomnia, nothing's real. Everything is far away. Everything is a <Highlight className="text-black">copy, of a copy, of a copy.</Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
