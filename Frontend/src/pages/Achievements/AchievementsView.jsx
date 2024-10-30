import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { Link, useNavigate } from "react-router-dom";
import AchievementService from "../../services/AchievementService";
import { Button, Table } from "react-bootstrap";
import { RouteNames } from "../../constants";


export default function AchievementsView(){
    const [achievement, setAchievement] = useState();
    const { showLoading, hideLoading} = useLoading();

    let navigate = useNavigate();

    async function fetchAchievements(){
        showLoading();
        await AchievementService.get()
        .then((response)=>{
            setAchievement(response);
        })
        .catch((e)=>{console.log(e)});
        hideLoading();
    }

    async function removeAchievement(id){
        showLoading();
        const response = await AchievementService.remove(id);
        hideLoading();
        if(response.error){
            alert(response.message);
            return;
        }
        fetchAchievements();
    }

    useEffect(()=>{
        fetchAchievements();
    }, []);


    return (
        <>
            <Link to={RouteNames.ACHIEVEMENTS_ADD}
            className="btn btn-success wide">Add new achievement</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Player Username</th>
                        <th>Trophy Title</th>
                        <th>Date Achieved</th>
                    </tr>
                </thead>
                <tbody>
                    {achievement && achievement.map((e,index)=>(
                        <tr key={index}>
                            <td>{e.playerUsername}</td>
                            <td>{e.trophyTitle}</td>
                            <td>{e.dateAchieved}</td>
                           
                            <td>
                                <Button
                                variant="danger"
                                onClick={()=>removeAchievement(e.id)}>
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