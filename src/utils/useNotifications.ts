import { useEffect } from "react";

type NotificationProp = {
  title: string;
  options?: NotificationOptions;
  duration?: number; 
};

const useNotifications = ({
  title,
  options,
  duration = 5000,
}: NotificationProp): void => {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }

    const triggerNotification = () => {
      if (Notification.permission === "granted") {
        const notification = new Notification(title, options);

        setTimeout(() => {
          notification.close();
        }, duration);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            const notification = new Notification(title, options);

            setTimeout(() => {
              notification.close();
            }, duration);
          }
        });
      }
    };

    triggerNotification();
  }, [title, options, duration]);
};

export default useNotifications;
