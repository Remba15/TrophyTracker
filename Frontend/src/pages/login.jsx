import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks/useAuth';
import { Image } from 'react-bootstrap';
import background from '../assets/background.png'

export default function login(){

    const { login } = useAuth();

    function handleSubmit(e) {
        e.preventDefault();
    
        const podaci = new FormData(e.target);
        login({
          email: podaci.get('email'),
          _password: podaci.get('_password'),
        });
      }

    return(
      
      <Container className='mt-4'>
        <p>
            demo e-mail: edunova@edunova.hr
        </p>
        <p>
            demo password: edunova
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              name='email'
              placeholder='Enter your e-mail address'
              maxLength={255}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='_password'>
            <Form.Label
            >Password</Form.Label>
            <Form.Control type='password' name='_password' required />
          </Form.Group>
          <Button variant='primary' type='submit'>
            Authorize
          </Button>
        </Form>
      </Container>
    );
}