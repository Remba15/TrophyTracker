import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameService from "../../services/GameService";
import TrophyService from "../../services/TrophyService";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";


export default function TrophiesAdd(){
    const navigate = useNavigate();

    const [games, setGames] = useState([]);
    const [gameID, setGameID] = useState(0);

    async function fetchGames(){
        const response = await GameService.get();
        setGames(response);
        setGameID(response.message[0].id);
    }


    useEffect(()=>{
        fetchGames();
    },[]);


    async function add(trophy){
        const response = await TrophyService.add(trophy);
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RouteNames.TROPHIES_VIEW);
    }

    function processSubmit(e){
        e.preventDefault();

        const data = new FormData(e.target);

        add({
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
                <Form.Control type="text" name="title" required/>
            </Form.Group>

            <Form.Group controlId="trophyDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="trophyDescription"/>
            </Form.Group>

            <Form.Group controlId="game">
                <Form.Label>Game</Form.Label>
                <Form.Select
                onChange={(e)=>{setGameID(e.target.value)}}
                >
                    {games && games.map((s,index)=>(
                        <option key={index} value={s.id}>
                            {s.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="trophyType">
                <Form.Label>Trophy Type</Form.Label>
                <Form.Control type="text" name="trophyType" required/>
            </Form.Group>

            <Row className="actions">
                <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.TROPHIES_VIEW}
                    className="btn btn-danger wide action_buttons">Cancel</Link>
                </Col>
                <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="success"
                    type="submit"
                    className="wide action_buttons">Add trophy</Button>
                </Col>
            </Row>
        </Form>
        </>
    );

}