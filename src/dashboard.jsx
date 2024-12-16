import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import { jwtDecode } from 'jwt-decode'; 
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


import './dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecodeUserID = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Failed to decode token:', error);
        navigate('/login');
      }
    };

    fetchDecodeUserID();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const categories = [
    { id: 1, name: 'T-Shirts', description: 'Explore trendy t-shirts.', img: '/tee.jpg' },
    { id: 2, name: 'Hoodies', description: 'Stay warm with our hoodies.', img: '/hoodies.jpg' },
    { id: 3, name: 'Pants', description: 'Find stylish pants.', img: '/pants.jpg' },
    { id: 4, name: 'Accessories', description: 'Add some flair with accessories.', img: '/watch.jpg' },
  ];

  // Static product data for design purposes
  const staticProducts = {
    1: [
      { id: 101, name: 'Classic T-Shirt', price: 19.99 },
      { id: 102, name: 'Graphic T-Shirt', price: 24.99 },
    ],
    2: [
      { id: 201, name: 'Pullover Hoodie', price: 39.99 },
      { id: 202, name: 'Zip-Up Hoodie', price: 44.99 },
    ],
    3: [
      { id: 301, name: 'Denim Jeans', price: 49.99 },
      { id: 302, name: 'Chinos', price: 39.99 },
    ],
    4: [
      { id: 401, name: 'Wrist Watch', price: 129.99 },
      { id: 402, name: 'Leather Belt', price: 29.99 },
    ],
  };

  const fetchProducts = (categoryId) => {
    // Use static data to simulate fetching products
    setProducts(staticProducts[categoryId] || []);
    setSelectedCategory(categories.find((cat) => cat.id === categoryId));
    setShowModal(true);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">Stussy Outlet</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title={user?.username || 'Account'} id="account-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/dashboard/logbook">Logbook</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Welcome Section */}
      <Container className="text-center my-5">
        <h2>Welcome to Stussy Outlet, {user?.username || 'Guest'}!</h2>
        <p>Discover your style with our exclusive collections.</p>
      </Container>

      {/* Categories Section */}
      <Container>
        <h3 className="mb-4">Categories</h3>
        <Row>
          {categories.map((category) => (
            <Col key={category.id} md={6} lg={3} className="mb-4">
              <Card className="category-card">
                <Card.Img variant="top" src={category.img} className="category-image" alt={category.name} />
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <Card.Text>{category.description}</Card.Text>
                  <button
                    className="btn btn-dark w-100"
                    onClick={() => fetchProducts(category.id)}
                  >
                    View Items
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for Products */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Products - {selectedCategory?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <strong>{product.name}</strong> - ${product.price.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No products found for this category.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashboard;
