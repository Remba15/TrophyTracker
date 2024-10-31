import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import { Button, Image, Table } from "react-bootstrap";
import moment from "moment";
import PlayerService from "../../services/PlayerService";
import placeholderPlayer from "../../assets/placeholderPlayer.png";
import useLoading from "../../hooks/useLoading";



export default function PlayersView(){

    const[players, setPlayers] = useState();

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function getPlayers(){
        showLoading();
        const response = await PlayerService.get();
        hideLoading();
        if(response.error){
            alert(response.message)
            return
        }
        setPlayers(response.message);
    }

    function formatDate(date){
        if(date==null){
            return 'Not defined';
        }
        return moment.utc(date).format('DD. MM. YYYY.')
    }

    function deleteRow(id){
        if(!confirm('Are you sure?')){
            return
        }
        deletePlayer(id);
    }

    async function deletePlayer(id){
        showLoading();
        const response = await PlayerService.remove(id);
        hideLoading();
        if(response.error){
            alert(response.message)
            return
        }
        getPlayers();
    }

    function image(player){
        if(player.image!=null){
            return APP_URL + player.image + `?${Date.now()}`;
        }
        return placeholderPlayer;
    }

    useEffect(()=>{
        getPlayers();
    },[])



    return (
        <>
            <Link to={RouteNames.PLAYERS_ADD} className="btn btn-success wide">Add new player</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Username</th>
                        <th>Registration Date</th>
                        <th>Region</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {players && players.map((player, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>
                                <Image 
                                    src={image(player)}
                                    alt="Player image"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                                />
                            </td>
                            <td style={{ textAlign: "center" }} className={player.username == null ? 'text-muted' : ''}>
                                {player.username == null ? 'Not defined' : player.username}
                            </td>
                            <td style={{ textAlign: "center" }} className={player.registrationDate == null ? 'text-muted' : ''}>
                                {player.registrationDate ? formatDate(player.registrationDate) : 'Not defined'}
                            </td>
                            <td style={{ textAlign: "center" }} className={player.region == null ? 'text-muted' : ''}>
                                {player.region == null ? 'Not defined' : player.region}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <Button
                                    className="action_buttons me-2"
                                    variant="info"
                                    onClick={() => navigate(`/Players/${player.id}`)}
                                >
                                    Update
                                </Button>
                                <Button
                                    className="action_buttons"
                                    variant="danger"
                                    onClick={() => deleteRow(player.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );

}