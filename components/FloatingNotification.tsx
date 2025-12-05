import React from 'react';
import { Notification } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

interface FloatingNotificationProps {
  notifications: Notification[];
}

export const FloatingNotification: React.FC<FloatingNotificationProps> = ({ notifications }) => {
  // We only show the latest notification
  const latest = notifications[notifications.length - 1];

  return (
    <div className="fixed top-24 left-0 right-0 z-50 pointer-events-none flex justify-center">
      <AnimatePresence>
        {latest && (
          <motion.div
            key={latest.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="bg-gray-800/90 text-white px-6 py-2 rounded-full shadow-xl backdrop-blur-md flex items-center space-x-2"
          >
            <span className="text-sm font-medium">{latest.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};