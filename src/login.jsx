import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {jwtDecode} from 'jwt-decode'; // Use named import
import { API_ENDPOINT } from './Api';
import './login.css'; // Import your CSS file

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decodedUser = jwtDecode(token);
          setUser(decodedUser);
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error verifying user session:', error);
        localStorage.removeItem('token');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {
        username,
        passwords: password,
      });

      localStorage.setItem('token', response.data.token);
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password. Please try again.');
      console.error('Error logging in', error);
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-md-center">
        <Col md={4}>
          <div className="login-form">
            <div className="text-center">
              <div className="login-logo mb-4">
                <img src="/STUSSY.png" alt="logo" className="logo-img" />
              </div>
              <h3 className="login-title">STUSSY</h3>
              <div className="card login-card">
                <div className="card-body login-card-body">
                  <form onSubmit={handleSubmit}>
                    <Form.Group controlId="formUsername" className="mb-3">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    {error && <p className="text-danger mb-3">{error}</p>}

                    <Form.Group controlId="formButton" className="d-grid gap-2">
                      <Button variant="dark" type="submit" className="login-button">
                        Login Now
                      </Button>
                    </Form.Group>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
