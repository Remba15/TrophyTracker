import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameService from "../../services/GameService";
import { Button, Table } from "react-bootstrap";
import { RouteNames } from "../../constants";


export default function GamesView(){

    const[games, setGames] = useState();

    const navigate = useNavigate();

    async function fetchGames(){
        await GameService.get()
        .then((response)=>{
            setGames(response);
        })
        .catch((e)=>{
            console.log(e)
        });
    }

    useEffect(()=>{
        fetchGames();
    },[]);


    async function deleteAsync(id){
        const response = await GameService.remove(id);
        if(response.error){
            alert(response.message)
            return
        }
        fetchGames();
    }

    function remove(id){
        deleteAsync(id);
    }


    return(
        <>
            <Link to={RouteNames.GAMES_ADD}
            className="btn btn-success wide">Add new game</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Developer</th>
                        <th>Platform</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {games && games.map((e,index)=>(
                        <tr key={index}>
                            <td>{e.title}</td>
                            <td>{e.developer}</td>
                            <td>{e.platform}</td>
                            <td>{e.description}</td>
                           
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/Games/${e.id}`)}>
                                    Update
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>remove(e.id)}>
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