"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent z-50 ">
      <div className="w-full flex justify-between items-center px-8 py-4">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.svg " // replace with your logo path (e.g., /fox.png)
            alt="Foxico Logo"
            width={28}
            height={28}
          />
          <h1 className="text-lg font-bold text-white">TravelX</h1>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex space-x-10 text-white text-xs font-semibold">
          <li>
            <Link href="/" className="hover:text-orange-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-orange-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-orange-400 transition">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-orange-400 transition">
              Contact
            </Link>
          </li>

        </ul>

        {/* Right: Greeting */}
        <div className="flex items-center space-x-10 text-white">
          <div className="w-7 h-7 flex items-center justify-center bg-white rounded-full">
            <img className="w-5 h-5" src="/search.svg" alt="search" />
          </div>
          <p className="hidden md:block text-sm font-semibold tracking-wide">Hello, Amney!</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
