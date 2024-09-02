import React from "react";
import { Link } from "react-router-dom";

interface Notification {
  message: string;
}

interface NotificationsProps {
  data: {
    notifications: Notification[];
  };
}

const Notifications: React.FC<NotificationsProps> = ({ data }) => {
  return (
    <div className="absolute bg-gray-700 top-20 right-5 px-3 py-2 rounded-md w-[22.7rem]">
      {data?.notifications.map((notification, index) => (
        <Link
          to="/manager/notifications"
          key={index}
          className="text-xs text-white font-medium block mb-2 w-[100%] overflow-hidden whitespace-nowrap text-ellipsis hover:text-blue-400 cursor-pointer py-2"
        >
          {notification.message}
        </Link>
      ))}
    </div>
  );
};

export default Notifications;
