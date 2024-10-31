import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TrophyService from "../../services/TrophyService";
import { RouteNames } from "../../constants";
import { Button, Table, Image } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import bronze from "../../assets/bronze.png";
import silver from "../../assets/silver.png";
import gold from "../../assets/gold.png";
import platinum from "../../assets/platinum.png";

export default function TrophiesView() {
    const [trophy, setTrophy] = useState();
    const { showLoading, hideLoading } = useLoading();
    let navigate = useNavigate();

    async function fetchTrophies() {
        showLoading();
        await TrophyService.get()
            .then((response) => {
                setTrophy(response);
            })
            .catch((e) => { console.log(e); });
        hideLoading();
    }

    async function removeTrophy(id) {
        showLoading();
        const response = await TrophyService.remove(id);
        hideLoading();
        if (response.error) {
            alert(response.message);
            return;
        }
        fetchTrophies();
    }

    useEffect(() => {
        fetchTrophies();
    }, []);

    // Mapping trophy types to their respective images
    const trophyImages = {
        bronze: bronze,
        silver: silver,
        gold: gold,
        platinum: platinum,
    };

    return (
        <>
            <div className="mb-3"> {/* Margin Bottom for spacing between button and table */}
                <Link to={RouteNames.TROPHIES_ADD} className="btn btn-success wide">Add new trophy</Link>
            </div>
    
            <div className="mt-4"> {/* Margin Top for spacing between navigation and table */}
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Game</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trophy && trophy.map((e, index) => (
                            <tr key={index}>
                                <td>{e.title}</td>
                                <td>{e.trophyDescription}</td>
                                <td>{e.gameTitle}</td>
                                <td style={{ textAlign: "center" }}>
                                    {trophyImages[e.trophyType.toLowerCase()] ? (
                                        <Image
                                            src={trophyImages[e.trophyType.toLowerCase()]}
                                            alt={`${e.trophyType.charAt(0).toUpperCase() + e.trophyType.slice(1)} Trophy`}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <span>Image not found</span>
                                    )}
                                </td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center">
                                        <Button
                                            variant="primary"
                                            onClick={() => navigate(`/Trophies/${e.id}`)}
                                            className="me-2"> {/* Adds right margin for spacing */}
                                            Update
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => removeTrophy(e.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}
