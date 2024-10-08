import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import DataVisualization from "./screens/DataVisualization/DataVisualization";
import TopNavBar from "./components/TopNavBar/TopNavBar";
import DataModelling from "./screens/DataModelling/DataModelling";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TopNavBar>
                <HomeScreen />
              </TopNavBar>
            </ProtectedRoute>
          }
        />
        <Route
          path="/studio"
          element={
            <ProtectedRoute>
              <TopNavBar>
                <DataVisualization />
              </TopNavBar>
            </ProtectedRoute>
          }
        />

        <Route
          path="/data-modelling"
          element={
            <ProtectedRoute>
              <TopNavBar>
                <DataModelling />
              </TopNavBar>
            </ProtectedRoute>
          }
        />

        {/* <Route path="/" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
