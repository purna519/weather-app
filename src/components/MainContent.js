// src/components/MainContent.js
import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import TodayForecast from "./TodayForecast";
import WeekForecast from "./WeekForecast";
import Highlights from "./Highlights";

function MainContent({
  weatherData,
  activeView,
  setActiveView,
  unitGroup,
  setUnitGroup,
}) {
  const units = {
    temp: unitGroup === "metric" ? "°C" : "°F",
    wind: unitGroup === "metric" ? "km/h" : "mph",
    visibility: unitGroup === "metric" ? "km" : "miles",
  };

  return (
    <div>
      {/* Header with Toggles */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Today/Week Toggle */}
        <ButtonGroup>
          <Button
            variant={activeView === "today" ? "primary" : "outline-secondary"}
            onClick={() => setActiveView("today")}
          >
            Today
          </Button>
          <Button
            variant={activeView === "week" ? "primary" : "outline-secondary"}
            onClick={() => setActiveView("week")}
          >
            Week
          </Button>
        </ButtonGroup>

        {/* C/F Toggle */}
        <ButtonGroup>
          <Button
            variant={unitGroup === "metric" ? "dark" : "outline-secondary"}
            onClick={() => setUnitGroup("metric")}
          >
            °C
          </Button>
          <Button
            variant={unitGroup === "us" ? "dark" : "outline-secondary"}
            onClick={() => setUnitGroup("us")}
          >
            °F
          </Button>
        </ButtonGroup>
      </div>

      {/* Conditional Forecast */}
      {activeView === "today" ? (
        <TodayForecast
          hourlyData={weatherData.days[0].hours}
          unit={units.temp}
        />
      ) : (
        <WeekForecast weeklyData={weatherData.days} unit={units.temp} />
      )}

      {/* Highlights */}
      <Highlights
        current={weatherData.currentConditions}
        today={weatherData.days[0]}
        units={units}
      />

      {/* Footer */}
      <div className="text-center mt-4 text-muted">
        Weather Prediction App by
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Purna Chandra Rao
        </a>
      </div>
    </div>
  );
}

export default MainContent;
