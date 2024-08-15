import axios from "axios";

export const getPublicIP = async (): Promise<string> => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", (error as Error).message);
    throw new Error("Unable to fetch IP address");
  }
};
