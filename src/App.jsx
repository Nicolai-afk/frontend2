import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.css";

// Importing the components for login, dashboard, and logbook
import Login from './login';
import Dashboard from './dashboard';
import Logbook from './logbook';

function App() {
  return (
    <Router>
      <Row>
        <Col md={12}>
          <Routes>
            {/* Define routes for login, dashboard, and logbook */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/logbook" element={<Logbook />} />
          </Routes>
        </Col>
      </Row>
    </Router>
  );
}

export default App;
