import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../constants';


export default function NavBar(){
    
    const navigate = useNavigate();
    
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand className='hand'
            onClick={()=>navigate(RouteNames.HOME)}
            >Trophy Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="https://remba16-001-site1.ltempurl.com/swagger/index.html">Swagger</Nav.Link>
                <NavDropdown title="Items" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={()=>navigate(RouteNames.PLAYERS_VIEW)}
                    >Players
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={()=>navigate(RouteNames.GAMES_VIEW)}>
                    Games
                    </NavDropdown.Item>

                    <NavDropdown.Item onClick={()=>navigate(RouteNames.TROPHIES_VIEW)}>
                    Trophies
                    </NavDropdown.Item>

                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}