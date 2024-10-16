import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../services/postData";
import { isToday, subDays, isWithinInterval } from "date-fns";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
);

const UserRoleChart = ({ selectedFilter }: { selectedFilter: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allusers"],
    queryFn: fetchUsers,
    staleTime: Infinity,
  });

  const applyDateFilter = (dateStr: string): boolean => {
    const date = new Date(dateStr);

    if (selectedFilter === "Today") {
      return isToday(date);
    } else if (selectedFilter === "Last 7 Days") {
      return isWithinInterval(date, {
        start: subDays(new Date(), 7),
        end: new Date(),
      });
    } else if (selectedFilter === "Last 30 Days") {
      return isWithinInterval(date, {
        start: subDays(new Date(), 30),
        end: new Date(),
      });
    }
    return true;
  };

  const filteredUsers = data
    ? data.filter((user: { createdAt: string }) =>
        applyDateFilter(user.createdAt),
      )
    : [];

  if (isLoading)
    return (
      <p className="flex items-center justify-center text-[14px] text-green-600">
        Loading chart...
      </p>
    );
  if (isError)
    return (
      <p className="flex items-center justify-center text-[14px] text-red">
        Error fetching chart data
      </p>
    );

  const roleCounts = filteredUsers.reduce(
    (acc, user) => {
      const role = user.role === "manager" ? "Organizations" : user.role;
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "User Roles",
        data: Object.values(roleCounts),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#ffffff",
              font: {
                size: 14,
              },
            },
          },
          title: {
            display: true,
            text: "Platform's users' Categorization",
            font: {
              size: 16,
              weight: "bold",
            },
            color: "#ffffff",
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || "";
                const value = context.formattedValue || "";
                const percentage = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentageValue = ((percentage / total) * 100).toFixed(2);
                return `${label}: ${value} (${percentageValue}%)`;
              },
            },
            bodyColor: "#ffffff",
            titleColor: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
      }}
    />
  );
};

export default UserRoleChart;
