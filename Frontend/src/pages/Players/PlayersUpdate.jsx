import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { useEffect, useState } from "react";
import PlayerService from "../../services/PlayerService";
import moment from "moment";


export default function PlayersUpdate(){

    const [player, setPlayer] = useState();
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

    async function update(player){
        const response = await PlayerService.update(routeParams.id, player);
        if(response.error){
            alert(response.message)
            return;
        }
        navigate(RouteNames.PLAYERS_VIEW)
    }

    function processSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target)
        update({
            username: data.get('username'),
            registrationDate: moment.utc(data.get('registrationDate')),
            region: data.get('region')
        })
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
                className="btn btn-danger wide">Cancel</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="success"
                type="submit"
                className="wide">Update player</Button>
            </Col>
        </Row>

        </Form>
        </>
    )

}