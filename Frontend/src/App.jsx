import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Container from 'react-bootstrap/Container';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Landing from './pages/landing';
import PlayersView from './pages/Players/PlayersView';
import PlayersAdd from './pages/Players/PlayersAdd';
import PlayersUpdate from './pages/Players/PlayersUpdate';
import GamesView from './pages/Games/GamesView';
import GamesAdd from './pages/Games/GamesAdd';
import GamesUpdate from './pages/Games/GamesUpdate';


function App() {

  return (
    <>
    <Container>
        <NavBar/>
        <Routes>
          <Route path={RouteNames.HOME} element={<Landing/>}/>

          <Route path={RouteNames.PLAYERS_VIEW} element={<PlayersView/>}/>
          <Route path={RouteNames.PLAYERS_ADD} element={<PlayersAdd/>}/>
          <Route path={RouteNames.PLAYERS_UPDATE} element={<PlayersUpdate/>}/>

          <Route path={RouteNames.GAMES_VIEW} element={<GamesView/>}/>
          <Route path={RouteNames.GAMES_ADD} element={<GamesAdd/>}/>
          <Route path={RouteNames.GAMES_UPDATE} element={<GamesUpdate/>}/>

        </Routes>
    </Container>

    </>
  )
}

export default App
