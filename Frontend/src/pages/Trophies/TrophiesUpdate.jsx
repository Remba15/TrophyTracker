import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GameService from "../../services/GameService";
import TrophyService from "../../services/TrophyService";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";


export default function TrophiesUpdate(){
    const navigate = useNavigate();
    const routeParams = useParams();

    const [games, setGames] = useState([]);
    const [gameID, setGameID] = useState(0);

    const [trophy, setTrophy] = useState({});

    async function fetchGames(){
        const response = await GameService.get();
        console.log(response)
        setGames(response)
    }

    async function fetchTrophies(){
        const response = await TrophyService.getById(routeParams.id)
        if(response.error){
            alert(response.message);
            return;
        }
        let trophy = response.message;
        setTrophy(trophy);
        setGameID(trophy.gameID);
    }

    async function fetchInitialData(){
        await fetchGames();
        await fetchTrophies();
    }

    useEffect(()=>{
        fetchInitialData();
    }, []);

    async function update(e){
        const response = await TrophyService.update(routeParams.id,e);
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RouteNames.TROPHIES_VIEW);
    }

    function processSubmit(e){
        e.preventDefault();

        const data = new FormData(e.target);

        update({
            title: data.get('title'),
            trophyDescription: data.get('trophyDescription'),
            gameID: parseInt(gameID),
            trophyType: data.get('trophyType')
        });
    }

    return (
        <>
            <Form onSubmit={processSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" required defaultValue={trophy.title}/>
                </Form.Group>

                <Form.Group controlId="trophyDescription">
                    <Form.Label>Trophy Description</Form.Label>
                    <Form.Control type="text" name="trophyDescription" defaultValue={trophy.trophyDescription}/>
                </Form.Group>

                <Form.Group controlId="game">
                    <Form.Label>Game</Form.Label>
                    <Form.Select
                    value={gameID}
                    onChange={(e)=>{setGameID(e.target.value)}}
                    >
                        {games && games.map((s, index)=>(
                            <option key={index} value={s.id}>
                                {s.title}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="trophyType">
                    <Form.Label>Trophy Type</Form.Label>
                    <Form.Control type="text" name="trophyType" defaultValue={trophy.trophyType}/>
                </Form.Group>

                <Row className="actions">
                    <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RouteNames.TROPHIES_VIEW}
                        className="btn btn-danger wide">Cancel</Link>
                    </Col>
                    <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="success"
                        type="submit"
                        className="wide">Update trophy</Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
    
}