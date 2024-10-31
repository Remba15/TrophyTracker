import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks/useAuth';
import background from '../assets/background.png';
import Modal from 'react-bootstrap/Modal';

export default function Login() {
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    login({
      email: podaci.get('email'),
      _password: podaci.get('_password'),
    }).catch(() => {
      setShowModal(true);
    });
  }

  return (
    <div className="login-page" style={{ backgroundImage: `url(${background})` }}>
      <Container className="login-container">
        <p className="demo-text">demo e-mail: edunova@edunova.hr</p>
        <p className="demo-text">demo password: edunova</p>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter your e-mail address"
              maxLength={255}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="_password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="_password" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Authorize
          </Button>
        </Form>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wrong email or password</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
