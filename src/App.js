// src/App.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { getWeatherVisuals } from "./utils";

function App() {
  const [city, setCity] = useState("Muktinath, Nepal");
  const [searchInput, setSearchInput] = useState("Muktinath, Nepal");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unitGroup, setUnitGroup] = useState("metric");
  const [activeView, setActiveView] = useState("today");

  const API_KEY = "EJ6UBL2JEQGYB3AA4ENASN62J"; // Your provided API key

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setWeatherData(null);

      try {
        const response = await fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`
        );

        if (!response.ok) {
          throw new Error("City not found. Please try again.");
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, unitGroup]); // Re-fetch if city or units change

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchInput);
  };

  // Get current background image
  const currentCondition = weatherData?.currentConditions?.icon || "default";
  const { background } = getWeatherVisuals(currentCondition);

  // This is an inline style. We use it *only* for the dynamic background
  // which is a core part of the app's functionality.
  const appStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px 0", // Add some padding
  };

  return (
    <div style={appStyle}>
      <Container className="shadow-lg rounded" style={{ overflow: "hidden" }}>
        <Row>
          {/* This is the Bootstrap layout.
            On medium (md) screens and up, the sidebar is 4 columns wide.
            On small (sm) screens, it's 12 columns (full width).
          */}
          <Col sm={12} md={4} className="bg-dark text-white p-4">
            <Sidebar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearch={handleSearch}
              weatherData={weatherData}
              loading={loading}
              error={error}
              unit={unitGroup === "metric" ? "°C" : "°F"}
            />
          </Col>

          {/* On medium (md) screens, main content is 8 columns.
            On small (sm) screens, it's 12 columns (full width).
          */}
          <Col sm={12} md={8} className="bg-light p-4">
            {/* Show loading spinner or error */}
            {loading && (
              <div className="text-center p-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {error && !loading && <Alert variant="danger">{error}</Alert>}

            {weatherData && !loading && (
              <MainContent
                weatherData={weatherData}
                activeView={activeView}
                setActiveView={setActiveView}
                unitGroup={unitGroup}
                setUnitGroup={setUnitGroup}
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
