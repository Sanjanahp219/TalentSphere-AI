import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import axios from 'axios';
import './Header.css';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/notifications');
        if (response.data.success) {
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  // Mark all as read
  const markAllRead = async () => {
    try {
      await axios.put('/api/notifications/read-all');
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
    } catch (error) {
      console.error('Error marking all read:', error);
    }
  };

  // Mark individual as read
  const toggleReadStatus = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => 
        n.id === id ? { ...n, unread: false } : n
      ));
    } catch (error) {
      console.error('Error marking notification read:', error);
    }
  };

  // Close when clicking outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="ts-notification-container" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="ts-notification-trigger">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && <span className="ts-notification-badge" />}
      </button>

      {isOpen && (
        <div className="ts-notification-dropdown">
          <div className="ts-notification-header">
            <span className="ts-notification-title">Notifications</span>
            {unreadCount > 0 && (
              <button onClick={markAllRead} className="ts-notification-readall-btn">
                Mark all read
              </button>
            )}
          </div>

          <div className="ts-notification-list">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => toggleReadStatus(notif.id)}
                  className={`ts-notification-item ${notif.unread ? 'ts-notification-item-unread' : ''}`}
                >
                  <p className="ts-notification-text">{notif.text}</p>
                  <span className="ts-notification-time">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="ts-notification-empty">No new notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
