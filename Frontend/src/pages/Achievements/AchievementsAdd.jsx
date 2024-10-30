import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../hooks/useLoading";
import PlayerService from "../../services/PlayerService";
import TrophyService from "../../services/TrophyService";
import AchievementService from "../../services/AchievementService";
import { RouteNames } from "../../constants";
import moment from "moment/moment";
import { Button, Col, Row, Form } from "react-bootstrap";


export default function AchievementsAdd(){
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [Player_ID, setPlayerID] = useState(0);
    
    const [trophies, setTrophies] = useState([]);
    const [Trophy_ID, setTrophyID] = useState(0);

    const { showLoading, hideLoading} = useLoading();

    async function fetchPlayers(){
        const response = await PlayerService.get();
        setPlayers(response.message);
        setPlayerID(response.message[0].id)
    }

    async function fetchTrophies(){
        const response = await TrophyService.get();
        setTrophies(response);
        setTrophyID(response.message[0].id)
    }

    useEffect(()=>{
        fetchPlayers();
        fetchTrophies();
    },[]);


    async function add(achievement){
        showLoading();
        const response = await AchievementService.add(achievement);
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        navigate(RouteNames.ACHIEVEMENTS_VIEW);
    }

    function processSubmit(e){
        e.preventDefault();

        const data = new FormData(e.target);

        add({
            Player_ID: parseInt(Player_ID),
            Trophy_ID: parseInt(Trophy_ID),
            dateAchieved: moment.utc(data.get('dateAchieved'))
        });
    }

    return (
        <>
        <Form onSubmit={processSubmit}>

            <Form.Group controlId="playerUsername">
                <Form.Label>Player</Form.Label>
                <Form.Select
                onChange={(e)=>{setPlayerID(e.target.value)}}
                >
                    {players && players.map((s,index)=>(
                        <option key={index} value={s.id}>
                            {s.username}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group controlId="trophyTitle">
                <Form.Label>Trophy</Form.Label>
                <Form.Select
                onChange={(e)=>{setTrophyID(e.target.value)}}
                >
                    {trophies && trophies.map((s,index)=>(
                        <option key={index} value={s.id}>
                            {s.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group controlId="dateAchieved">
                <Form.Label>Date Achieved</Form.Label>
                <Form.Control type="date" name="dateAchieved"/>
            </Form.Group>

            <Row className="actions">
                <Col xs={6} sm={12} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RouteNames.ACHIEVEMENTS_VIEW}
                    className="btn btn-danger wide action_buttons">Cancel</Link>
                </Col>
                <Col xs={6} sm={12} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="success"
                    type="submit"
                    className="wide action_buttons">Add achievement</Button>
                </Col>
            </Row>
        </Form>
        </>
    );

}