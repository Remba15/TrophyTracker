import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { APP_URL, RouteNames } from '../constants';


export default function NavBar(){
    
    const navigate = useNavigate();

    function openSwaggerURL(){
        window.open(APP_URL + "/swagger/index.html", "_blank")
    }
    
    return (
        <>
        <Navbar expand="lg"
        className="bg-body-tertiary"
        >
            <Navbar.Brand className='hand'
            onClick={()=>navigate(RouteNames.HOME)}
            >Trophy Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link onClick={openSwaggerURL}>Swagger</Nav.Link>
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

                    <NavDropdown.Item onClick={()=>navigate(RouteNames.ACHIEVEMENTS_VIEW)}>
                    Achievements
                    </NavDropdown.Item>

                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
}