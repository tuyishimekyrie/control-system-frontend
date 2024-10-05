import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { fetchTotalTimeSpentPerWebsite } from "../../services/LogsData";
import { isToday, subDays, isWithinInterval } from "date-fns";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const TopWebsitesChart = ({ selectedFilter }: { selectedFilter: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["managertopsites", selectedFilter],
    queryFn: () => fetchTotalTimeSpentPerWebsite(selectedFilter),
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

  const filteredData = data
    ? data.filter((item: { date?: string; url: string }) => {
        if (item.date) {
          return applyDateFilter(item.date);
        }
        return selectedFilter === "All Time";
      })
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

  const chartData = {
    labels: filteredData.map((item: { url: string }) => item.url),
    datasets: [
      {
        label: "Total Duration (seconds)",
        data: filteredData.map(
          (item: { totalDuration: number }) => item.totalDuration,
        ),
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <Bar
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
            text: "Most Visited Websites",
            font: {
              size: 16,
              weight: "bold",
            },
            color: "#ffffff",
          },
          tooltip: {
            bodyColor: "#ffffff",
            titleColor: "#ffffff",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Websites (domain)",
              align: "center",
              font: {
                size: 14,
              },
              color: "green",
            },
            ticks: {
              color: "#ffffff",
              autoSkip: false,
              maxRotation: 90,
              minRotation: 45,
              font: {
                size: 14,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: "Total Duration (seconds)",
              color: "green",
              font: {
                size: 14,
              },
            },
            ticks: {
              color: "#ffffff",
              stepSize: 500,
              font: {
                size: 14,
              },
            },
          },
        },
      }}
    />
  );
};

export default TopWebsitesChart;
