import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Table } from "react-bootstrap";
import moment from "moment";
import PlayerService from "../../services/PlayerService";



export default function PlayersView(){

    const[players, setPlayers] = useState();

    const navigate = useNavigate();

    async function getPlayers(){
        const response = await PlayerService.get();
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
        const response = await PlayerService.deletion(id);
        if(response.error){
            alert(response.message)
            return
        }
        getPlayers();
    }

    useEffect(()=>{
        getPlayers();
    },[])



    return(
        <>
            <Link to={RouteNames.PLAYERS_ADD}
            className="btn btn-success wide">Add new player</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Registration Date</th>
                        <th>Region</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {players && players.map((player, index)=>(
                        <tr key={index}>
                            <td className={player.username==null ? 'middle' : 'right'}>
                                {player.username==null ? 'Not defined' : player.username}
                            </td>
                            <td className={player.registrationDate==null ? 'middle' : 'right'}>
                                {formatDate(player.registrationDate)}
                            </td>
                            <td className={player.region==null ? 'middle' : 'right'}>
                                {player.region==null ? 'Not defined' : player.region}
                            </td>
                            <td className="right">

                                <Button
                                className="action_buttons"
                                variant="info"
                                onClick={()=>navigate(`/Players/${player.id}`)}
                                >
                                    Update
                                </Button>

                                <Button
                                className="action_buttons"
                                variant="danger"
                                onClick={()=>deleteRow(player.id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}