import { Link, useNavigate } from "react-router-dom";
import PlayerService from "../../services/PlayerService";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import moment from "moment";
import useLoading from "../../hooks/useLoading";


export default function PlayersAdd(){
    const navigate = useNavigate()
    const { showLoading, hideLoading } = useLoading();

    async function addPlayer(player){
        showLoading();
        const response = await PlayerService.add(player)
        hideLoading();
        if(response.error){
            alert(response.message)
            return;
        }
        navigate(RouteNames.PLAYERS_VIEW);
    }

    function processSubmit(e){
        e.preventDefault();
        let data = new FormData(e.target)
        addPlayer({
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
                <Form.Control type="text" name="username" required/>
            </Form.Group>

            <Form.Group controlId="registrationDate">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control type="date" name="registrationDate"/>
            </Form.Group>

            <Form.Group controlId="region">
                <Form.Label>Region</Form.Label>
                <Form.Control type="text" name="region" required/>
            </Form.Group>

        <Row className="actions">
            <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                <Link to={RouteNames.PLAYERS_VIEW}
                className="btn btn-danger wide action_buttons">Cancel</Link>
            </Col>
            <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                <Button variant="success"
                type="submit"
                className="wide action_buttons">Add player</Button>
            </Col>
        </Row>
        </Form>
        </>

    )
}