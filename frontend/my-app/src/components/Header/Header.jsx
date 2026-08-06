import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import Notifications from './Notifications';
import UserMenu from './UserMenu';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="ts-header flex items-center justify-center gap-2">

      {/* Brand Logo */}
      <div className="flex items-center gap-4">
        <Logo size="md" />
      </div>

      {/* Search Bar Container */}
      <div className="flex-1  mx-8 hidden md:block max-w-[400px]">
        <SearchBar />
      </div>

      {/* Action Items Container */}
      <div className="flex items-center gap-4">
        {/* Ask AI Quick Link */}
        <button 
          onClick={() => navigate('/ai-assistant')}
          className="hidden lg:flex items-center gap-2 px-4 h-10 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 hover:from-cyan-500/20 hover:to-indigo-500/20 border border-cyan-500/25 hover:border-cyan-500/40 text-cyan-400 hover:text-cyan-300 font-medium text-xs transition-all duration-200"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Ask AI</span>
        </button>

        {/* Notifications Button & Dropdown */}
        <Notifications />

        {/* User Profile Menu */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
