// src/components/WeekForecast.js
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { getWeatherIcon } from "../utils";
import { formatDay } from "../utils";

function WeekForecast({ weeklyData, unit }) {
  // Take the first 7 days
  const sevenDayForecast = weeklyData.slice(0, 7);

  return (
    // This grid is responsive:
    // xs={3}: 3 columns on extra-small screens
    // md={4}: 4 columns on medium screens
    // lg={7}: 7 columns on large screens
    // g-2: adds a gutter (gap)
    <Row xs={3} md={4} lg={7} className="g-2 py-3">
      {sevenDayForecast.map((day, index) => (
        <Col key={index}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title style={{ fontSize: "0.9rem" }}>
                {index === 0 ? "Today" : formatDay(day.datetimeEpoch)}
              </Card.Title>
              <img
                src={getWeatherIcon(day.icon)}
                alt={day.conditions}
                width="40"
                height="40"
                className="my-2"
              />
              <div className="fw-bold">
                {Math.round(day.tempmax)}
                {unit}
              </div>
              <div className="text-muted">
                {Math.round(day.tempmin)}
                {unit}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default WeekForecast;
