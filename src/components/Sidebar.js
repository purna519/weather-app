// src/components/Sidebar.js
import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { formatCurrentDateTime } from "../utils";

function Sidebar({
  searchInput,
  setSearchInput,
  handleSearch,
  weatherData,
  unit,
}) {
  const current = weatherData?.currentConditions;
  const location = weatherData?.resolvedAddress;

  return (
    <div>
      {/* Search Bar */}
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search for cities..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>

      {/* Main Weather Display */}
      {current && (
        <div className="text-center my-4">
          {/* This is a simple representation of the raindrops */}
          <div className="h1">💧 💧 💧</div>

          {/* display-1 is a large Bootstrap text class */}
          <h1 className="display-1 fw-light">
            {Math.round(current.temp)}
            <span className="h1 align-top">{unit}</span>
          </h1>
          <p className="lead">{formatCurrentDateTime(current.datetimeEpoch)}</p>

          <hr className="my-4" />

          <h5>{current.conditions}</h5>
          <p>Precipitation: {current.precipprob || 0}%</p>
        </div>
      )}

      {/* Location at the bottom */}
      {location && (
        <div className="mt-auto text-center">
          <p className="lead">{location}</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
