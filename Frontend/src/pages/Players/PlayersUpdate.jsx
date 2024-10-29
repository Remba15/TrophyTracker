import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RouteNames } from "../../constants";
import { useEffect, useRef, useState } from "react";
import PlayerService from "../../services/PlayerService";
import moment from "moment";
import useLoading from "../../hooks/useLoading";
import placeholderPlayer from "../../assets/placeholderPlayer.png"
import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';


export default function PlayersUpdate(){

    const [player, setPlayer] = useState({});
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    const routeParams = useParams();

    const [currentImage, setCurrentImage] = useState('');
    const [imageCrop, setImageCrop] = useState('');
    const [imageForServer, setImageForServer] = useState('');
    const cropperRef = useRef(null);

    async function fetchPlayer(){
        showLoading();
        const response = await PlayerService.getById(routeParams.id);
        hideLoading();
        if(response.error){
            alert(response.message)
            return
        }
        let s = response.message
        s.registrationDate = moment.utc(s.registrationDate).format('yyyy-MM-DD')
        setPlayer(s)

        if(response.message.image!=null){
            setCurrentImage(APP_URL + response.message.image + `?${Date.now()}`);
        } else{
            setCurrentImage(placeholderPlayer);
        }
    }

    useEffect(()=>{
        fetchPlayer();
    })

    async function update(player){
        showLoading();
        const response = await PlayerService.update(routeParams.id, player);
        hideLoading();
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

    function onCrop(){
        setImageForServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL);
    }

    function onChangeImage(e){
        e.preventDefault();

        let files;
        if (e.dataTransfer){
            files = e.dataTransfer.files;
        } else if (e.target){
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImageCrop(reader.result)
        };
        try {
            reader.readAsDataURL(files[0]);
        } catch (error){
            console.error(error);
        }
    }

    async function saveImage(){
        showLoading();
        const base64 = imageForServer;
        const response = await PlayerService.setImage(routeParams.id, 
            {Base64: base64.replace('data:image/png;base64,', '')});
        hideLoading();
        if(response.error){
            alert(response.data);
        }
        setCurrentImage(imageForServer);
    }

    return(
        <>
            <Row>
                <Col key='1' sm={12} lg={6} md={6}>
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

                        <Row className="mb-4">
                            <Col key='1' sm={12} lg={6} md={12}>
                                <p className='form-label'>Current Image</p>
                                <Image src={currentImage} className='image'/>
                            </Col>
                            <Col key='2' sm={12} lg={6} md={12}>
                                {imageForServer &&(
                                    <>
                                        <p className='form-label'>New Image</p>
                                        <Image src={imageForServer || imageCrop} className='image'/>
                                    </>
                                )}
                            </Col>
                        </Row>

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
                </Col>
                <Col key='2' sm={12} lg={6} md={6}>
                    <input className="mb-3" type='file' onChange={onChangeImage} />
                    <Button disabled={!imageForServer} onClick={saveImage}>
                        Save Image
                    </Button>
                    <Cropper
                        src={imageCrop}
                        style={{ height: 400, width: '100%' }}
                        initialAspectRatio={1}
                        guides={true}
                        viewMode={1}
                        minCropBoxWidth={50}
                        minCropBoxHeight={50}
                        cropBoxResizable={false}
                        background={false}
                        responsive={true}
                        checkOrientation={false}
                        cropstart={onCrop}
                        cropend={onCrop}
                        ref={cropperRef}
                    />
                </Col>
            </Row>
        </>
    )

}