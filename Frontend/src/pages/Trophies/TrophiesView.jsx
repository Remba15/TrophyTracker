import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrophyService from "../../services/TrophyService";
import { RouteNames } from "../../constants";
import { Button, Table } from "react-bootstrap";


export default function TrophiesView(){

    const [trophy, setTrophy] = useState();
    let navigate = useNavigate();

    async function fetchTrophies(){
        await TrophyService.get()
        .then((response)=>{
            setTrophy(response);
        })
        .catch((e)=>{console.log(e)});
    }

    async function removeTrophy(id){
        const response = await TrophyService.remove(id);
        if(response.error){
            alert(response.message);
            return;
        }
        fetchTrophies();
    }

    useEffect(()=>{
        fetchTrophies();
    },[]);


    return (
        <>
            <Link to={RouteNames.TROPHIES_ADD}
            className="btn btn-success wide">Add new trophy</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Game</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {trophy && trophy.map((e,index)=>(
                        <tr key={index}>
                            <td>{e.title}</td>
                            <td>{e.trophyDescription}</td>
                            <td>{e.gameTitle}</td>
                            <td>{e.trophyType}</td>
                           
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/Trophies/${e.id}`)}>
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
    );


}