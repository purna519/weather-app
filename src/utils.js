// src/utils.js

// --- Weather Visuals ---
const weatherConditions = {
  "partly-cloudy-day": {
    icon: "https://i.ibb.co/PZQXH8V/27.png",
    background: "https://i.ibb.co/qNv7NxZ/pc.webp",
  },
  "partly-cloudy-night": {
    icon: "https://i.ibb.co/Kzkk59k/15.png",
    background: "https://i.ibb.co/RDfPqXz/pcn.jpg",
  },
  rain: {
    icon: "https://i.ibb.co/kBd2NTS/39.png",
    background: "https://i.ibb.co/h2p6Yhd/rain.webp",
  },
  "clear-day": {
    icon: "https://i.ibb.co/rb4rrJL/26.png",
    background: "https://i.ibb.co/WGry01m/cd.jpg",
  },
  "clear-night": {
    icon: "https://i.ibb.co/1nxNGHL/10.png",
    background: "https://i.ibb.co/kqtZ1Gx/cn.jpg",
  },
  default: {
    icon: "https://i.ibb.co/rb4rrJL/26.png",
    background: "https://i.ibb.co/qNv7NxZ/pc.webp",
  },
};

export const getWeatherVisuals = (condition) => {
  return weatherConditions[condition] || weatherConditions["default"];
};

export const getWeatherIcon = (condition) => {
  return (weatherConditions[condition] || weatherConditions["default"]).icon;
};

// --- Formatting Helpers ---

export const formatTime = (epoch) => {
  return new Date(epoch * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatSunriseSunset = (timeString) => {
  if (!timeString) return "N/A";
  const [hour, minute] = timeString.split(":");
  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatCurrentDateTime = (epoch) => {
  const date = new Date(epoch * 1000);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${weekday}, ${time}`;
};

export const formatDay = (epoch) => {
  return new Date(epoch * 1000).toLocaleDateString("en-US", {
    weekday: "long",
  });
};

// --- Description Helpers ---

export const getUVDescription = (uv) => {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very High";
  return "Extreme";
};

export const getHumidityDescription = (humidity) => {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Normal";
  return "High";
};

export const getVisibilityDescription = (visibility) => {
  if (visibility < 1) return "Poor";
  if (visibility < 10) return "Moderate";
  return "Very Clear Air";
};

export const getAQIDescription = (aqi) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};
