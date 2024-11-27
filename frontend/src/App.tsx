import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequestRide from "./pages/RequestRide";
import History from "./pages/History";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestRide />} />
        <Route path="/history/" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
