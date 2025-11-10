// src/components/TodayForecast.js
import React from "react";
import { Card } from "react-bootstrap";
import { getWeatherIcon } from "../utils";
import { formatTime } from "../utils";

function TodayForecast({ hourlyData, unit }) {
  return (
    // 'd-flex' (display: flex) and 'overflow-auto' make it scroll horizontally
    <div className="d-flex overflow-auto py-3">
      {hourlyData.map((hour, index) => (
        // We use an inline style here *only* because Bootstrap doesn't have a
        // 'min-width' utility class. This is needed for horizontal scrolling.
        <div key={index} style={{ minWidth: "100px" }} className="me-2">
          <Card className="text-center">
            <Card.Body>
              <Card.Title style={{ fontSize: "0.9rem" }}>
                {formatTime(hour.datetimeEpoch)}
              </Card.Title>
              <img
                src={getWeatherIcon(hour.icon)}
                alt={hour.conditions}
                width="40"
                height="40"
                className="my-2"
              />
              <div className="fw-bold">
                {Math.round(hour.temp)}
                {unit}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default TodayForecast;
