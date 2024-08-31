import React from "react";

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
        <span
          key={index}
          className="text-xs text-white font-medium block mb-2 w-[100%] overflow-hidden whitespace-nowrap text-ellipsis hover:text-gray-300 cursor-pointer"
        >
          {notification.message}
        </span>
      ))}
    </div>
  );
};

export default Notifications;
