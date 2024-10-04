import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";
import PlayerService from "../../services/PlayerService";


export default function PlayersUpdate(){
    const [player, setPlayer] = useState({});
    const navigate = useNavigate();
    const routeParams = useParams();

    async function fetchPlayer(){
        const response = await PlayerService.getById(routeParams.id);
        if(response.error){
            alert(response.message)
            return
        }
        let s = response.message
        s.registrationDate = moment.utc(s.registrationDate).format('yyyy-MM-DD')
        setPlayer(s)
    }

    useEffect(()=>{
        fetchPlayer();
    })

    function processSubmit(e){
        e.preventDefault();
    }

    return(
        <>
        <Form onSubmit={processSubmit}>

            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" required
                defaultValue={player.username}/>
            </Form.Group>

            <Form.Group controlId="registrationDate">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control type="date" name="registrationDate"
                defaultValue={player.registrationDate}/>
            </Form.Group>

            <Form.Group controlId="region">
                <Form.Label>Region</Form.Label>
                <Form.Control type="text" name="region"
                defaultValue={player.region}/>
            </Form.Group>

        <Row className="actions">
        <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RouteNames.PLAYERS_VIEW}
                className="btn btn-danger siroko">Cancel</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="success"
                type="submit"
                className="siroko">Update player</Button>
            </Col>
        </Row>

        </Form>
        </>
    )

}