import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import './Header.css';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  // Get first letter of username
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : null;

  return (
    <div className="ts-usermenu-container" ref={menuRef}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="ts-usermenu-trigger"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="ts-usermenu-avatar">
          {avatarLetter ? avatarLetter : <User className="w-4 h-4" />}
        </div>
        <div className="ts-usermenu-details">
          <span className="ts-usermenu-name">{user?.name || 'User'}</span>
          <span className="ts-usermenu-role">{user?.role || 'Member'}</span>
        </div>
        <ChevronDown className={`ts-usermenu-chevron ${isOpen ? 'ts-usermenu-chevron-open' : ''}`} />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="ts-usermenu-dropdown">
          {/* User identity details header */}
          <div className="ts-usermenu-header">
            <p className="ts-usermenu-header-title">Signed in as</p>
            <p className="ts-usermenu-header-email">{user?.email || 'user@company.com'}</p>
          </div>

          {/* Dropdown items */}
          <button onClick={() => handleNavigation('/profile')} className="ts-usermenu-item">
            <User className="w-4 h-4" />
            <span>My Profile</span>
          </button>

          <button onClick={() => handleNavigation('/settings')} className="ts-usermenu-item">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>

          <div className="ts-usermenu-divider" />

          {/* Logout Action */}
          <button onClick={handleLogout} className="ts-usermenu-item ts-usermenu-logout">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
