export const useLocalStorage = () => {
  const data = window.localStorage.getItem("user");
  if (data) return JSON.parse(data);
  return null;
};
