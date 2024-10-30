import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameService from "../../services/GameService";
import { Button, Card, Col, Form, Pagination, Row } from "react-bootstrap";
import placeholder from '../../assets/placeholder.png';
import { APP_URL, RouteNames } from "../../constants";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import useLoading from "../../hooks/useLoading";
import axios from "axios";


export default function GamesView(){

    const[games, setGames] = useState();
    const[page, setPages] = useState(1);
    const[condition, setCondition] = useState('');
    const { showLoading, hideLoading } = useLoading();

    const RAWG_API_KEY = "0ae46e984a574093a554c19b0af382f5"


    async function fetchGames(){
        showLoading();
        const response = await GameService.getPages(page, condition);
        hideLoading();
        if(response.error){
            alert(response.message);

            return;
        }
        if(response.message.length==0){
            setPages(page-1);
            return;
        }
        //dodatak
        var fetchedGames = response.message;
        setGames(fetchedGames);

        fetchedGames.forEach(game => fetchGameImage(game));
    }

    async function fetchGameImage(game) {
        try {
            const response = await axios.get(`https://api.rawg.io/api/games`, {
                params: {
                    search: game.title,
                    key: RAWG_API_KEY
                }
            });
    
            if (response.data.results && response.data.results.length > 0) {
                const imageUrl = response.data.results[0].background_image;
                console.log(`Setting image URL for game ${game.title}: ${imageUrl}`);
    
                setGames(prevGames => 
                    prevGames.map(g => g.id === game.id ? { ...g, imageUrl } : g)
                );
            } else {
                console.log(`No image found for ${game.title}. Setting placeholder.`);
                setGames(prevGames => 
                    prevGames.map(g => g.id === game.id ? { ...g, imageUrl: placeholder } : g)
                );
            }
        } catch (error) {
            console.error("Error fetching image from RAWG:", error);
        }
    }

    useEffect(()=>{
        fetchGames();
    },[page, condition]);


    async function deleteAsync(id){
        showLoading();
        const response = await GameService.remove(id);
        hideLoading();
        if(response.error){
            alert(response.message)
            return
        }
        fetchGames();
    }

    function remove(id){
        deleteAsync(id);
    }

    function image(game) {
        console.log(`Displaying image for ${game.title}: ${game.imageUrl || placeholder}`);
        return game.imageUrl || placeholder;
    }

    // function image(game){
    //     if(game.image!=null){
    //         return APP_URL + game.image + `?${Date.now()}`;
    //     }
    //     return placeholder;
    // }

    function changeCondition(e){
        if(e.nativeEvent.key == "Enter"){
            console.log('Enter');
            setPages(1);
            setCondition(e.nativeEvent.srcElement.value);
            showLoading();
            setGames([]);
            hideLoading();
        }
    }

    function increasePage(){
        showLoading();
        setPages(page + 1);
        hideLoading();
    }

    function decreasePage(){
        showLoading();
        if(page == 1){
            return;
        }
        setPages(page - 1);
        hideLoading();
    }


    return(
        <>
            <Row>
                <Col key={1} sm={12} lg={4} md={4}>
                    <Form.Control
                    type='text'
                    name='search'
                    placeholder="Game title or developer [Enter]"
                    maxLength={255}
                    defaultValue=''
                    onKeyUp={changeCondition}
                    />
                </Col>
                <Col key={3} sm={12} lg={4} md={4}>
                    <Link to={RouteNames.GAMES_ADD} className="btn btn-success wide">
                        <IoIosAdd
                        size={25}
                        /> Add Game
                    </Link>
                </Col>
            </Row>


            <Row>
                {games && games.map((p) => (
                    <Col key={p.id} sm={4} lg={3} md={3}>
                        <Card style={{ marginTop: '1rem' }}>
                            <Card.Img variant="top" src={image(p)} className="image" />
                            <Card.Body>
                                <Card.Title>{p.title}</Card.Title>
                                <Card.Text>
                                    {p.developer}
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Link className="btn btn-primary" to={`/Games/${p.id}`}><FaEdit /></Link>
                                    </Col>
                                    <Col>
                                        <Button variant="danger" onClick={() => remove(p.id)}><FaTrash /></Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {/* <Row>
                { games && games.map((p) => (
                    <Col key={p.id} sm={4} lg={3} md={3}>
                        <Card style={{marginTop: '1rem'}}>
                            <Card.Img variant="top" src={image(p)} className="image"/>
                            <Card.Body>
                                <Card.Title>{p.title}</Card.Title>
                                <Card.Text>
                                    {p.developer}
                                </Card.Text>
                                <Row>
                                    <Col>
                                        <Link className="btn btn-primary" to={`/Games/${p.id}`}><FaEdit/></Link>
                                    </Col>
                                    <Col>
                                    <Button variant="danger" onClick={() => remove(p.id)}><FaTrash/></Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> */}
            <hr />
            <Row>
                <Col key={1} sm={12} lg={4} md={4}>
                    {games && games.length > 0 && (
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Pagination size="lg">
                                <Pagination.Prev onClick={decreasePage} />
                                <Pagination.Item disabled>{page}</Pagination.Item>
                                <Pagination.Next onClick={increasePage}/>
                            </Pagination>
                        </div>
                    )}
                </Col>
            </Row>
        </>
    )


}