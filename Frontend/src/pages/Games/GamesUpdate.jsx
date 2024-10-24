import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GameService from "../../services/GameService";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";



export default function GamesUpdate(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [game, setGame] = useState({});


    async function fetchGame(){
        const response = await GameService.getById(routeParams.id);
        if(response.error){
            alert(response.message);
            return;
        }
        setGame(response.message);
       // console.log(game.title)
    }

    useEffect(()=>{
        fetchGame();
    },[]);

    async function update(e){
        const response = await GameService.update(routeParams.id,e);
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RouteNames.GAMES_VIEW);
    }

    function processSubmit(e){
        e.preventDefault();

        const data = new FormData(e.target);

        update({
            title: data.get('title'),
            developer: data.get('developer'),
            gamePlatform: data.get('gamePlatform'),
            gameDescription: data.get('gameDescription')
        });
    }

    return(
        <>
        <Form onSubmit={processSubmit}>

            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" required 

                 defaultValue={game.title}
                />
            </Form.Group>

            <Form.Group controlId="developer">
                <Form.Label>Developer</Form.Label>
                <Form.Control type="text" name="developer"
                 defaultValue={game.developer}
                />
            </Form.Group>

            <Form.Group controlId="gamePlatform">
                <Form.Label>Platform</Form.Label>
                <Form.Control type="text" name="gamePlatform"
               defaultValue={game.gamePlatform}
                />
            </Form.Group>

            <Form.Group controlId="gameDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="gameDescription"
                 defaultValue={game.gameDescription}
                />
            </Form.Group>

        <Row className="actions">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RouteNames.GAMES_VIEW}
                className="btn btn-danger wide">Cancel</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="success"
                type="submit"
                className="wide">Update game</Button>
            </Col>
        </Row>

        </Form>
        </>
    )

}