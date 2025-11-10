// src/components/Highlights.js
import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import {
  formatSunriseSunset,
  getUVDescription,
  getHumidityDescription,
  getVisibilityDescription,
  getAQIDescription,
} from "../utils";

// A simple reusable card for the grid
const HighlightCard = ({ title, value, unit, description }) => (
  <Card>
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
      <Card.Title as="h2" className="fw-bold">
        {value}
        {unit && <span className="h4"> {unit}</span>}
      </Card.Title>
      {description && <Card.Text>{description}</Card.Text>}
    </Card.Body>
  </Card>
);

// Special card for Sunrise/Sunset
const SunriseCard = ({ sunrise, sunset }) => (
  <Card>
    <Card.Body>
      <Card.Subtitle className="mb-2 text-muted">
        Sunrise & Sunset
      </Card.Subtitle>
      <h5 className="fw-bold">🌅 {formatSunriseSunset(sunrise)}</h5>
      <h5 className="fw-bold">🌇 {formatSunriseSunset(sunset)}</h5>
    </Card.Body>
  </Card>
);

function Highlights({ current, today, units }) {
  return (
    <div className="mt-4">
      <h3>Today's Highlights</h3>
      <Row xs={1} md={2} lg={3} className="g-3 mt-2">
        <Col>
          <HighlightCard
            title="UV Index"
            value={today.uvindex}
            description={getUVDescription(today.uvindex)}
          />
        </Col>
        <Col>
          <HighlightCard
            title="Wind Status"
            value={Math.round(current.windspeed)}
            unit={units.wind}
          />
        </Col>
        <Col>
          <SunriseCard sunrise={today.sunrise} sunset={today.sunset} />
        </Col>
        <Col>
          <HighlightCard
            title="Humidity"
            value={Math.round(current.humidity)}
            unit="%"
            description={getHumidityDescription(current.humidity)}
          />
        </Col>
        <Col>
          <HighlightCard
            title="Visibility"
            value={Math.round(current.visibility)}
            unit={units.visibility}
            description={getVisibilityDescription(current.visibility)}
          />
        </Col>
        <Col>
          <HighlightCard
            title="Air Quality"
            value={Math.round(current.aqi || 0)}
            description={getAQIDescription(current.aqi || 0)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Highlights;
