import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Landing from './pages/landing';
import PlayersView from './pages/Players/PlayersView';
// import PlayersAdd from './pages/Players/PlayersAdd';


function App() {

  return (
    <>
    <Container>
        <NavBar/>
        <Routes>
          <Route path={RouteNames.HOME} element={<Landing/>}/>
          <Route path={RouteNames.PLAYERS_VIEW} element={<PlayersView/>}/>
          {/* <Route path={RouteNames.PLAYERS_ADD} element={<PlayersAdd/>}/> */}
        </Routes>
    </Container>

    </>
  )
}

export default App
