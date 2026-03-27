import React from 'react';
import './Notification.css';

/**
 * Notification toast
 * @param {Object} props - Props du composant
 * @param {string} props.message - Message de notification
 * @param {string} props.type - success, warning, error, info (default: info)
 * @param {number} props.duration - Durée en ms (default: 3000)
 * @param {function} props.onClose - Callback de fermeture
 */
export const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const { message, type = 'info', duration = 3000, onClose } = props;
  
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  return (
    <div className={`notification notification-${type}`}>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
