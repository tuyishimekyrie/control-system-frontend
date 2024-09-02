import { useQuery } from "@tanstack/react-query";
import { fetchManagerNotifications } from "../../services/postData";

const Notification = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notification"],
    queryFn: () => fetchManagerNotifications(),
  });

  if (isError) {
    return <h1>Error Occurred</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="text-white flex items-left flex-col px-10">
      <h1 className="pb-10 text-4xl">Notifications</h1>
      {data?.notifications.map((notificationMsg) => (
        <h1
          key={notificationMsg.id}
          className={`${notificationMsg.unread ? "text-left pb-4 text-green-400" : "font-normal text-gray-400"}`}
        >
          {notificationMsg.message}
        </h1>
      ))}
    </div>
  );
};

export default Notification;
