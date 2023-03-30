import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SongService from "../services/SongService";
import { useParams, useNavigate } from "react-router-dom";

const Song = () => {
    const initialSongState = {
        id: null,
        title: "",
        artist: "",
        album: "",
        genre: "",
    };
    const [show, setShow] = useState(true);
    const [currentSong, setCurrentSong] = useState(initialSongState);
    const { id } = useParams();
    const navigate = useNavigate();

    const getSong = (id) => {
        SongService.get(id)
            .then((response) => {
                setCurrentSong(response.data.song);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getSong(id);
    }, [id]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentSong({ ...currentSong, [name]: value });
    };

    const updateSong = () => {
        SongService.update(currentSong.id, currentSong)
            .then((response) => {
                console.log("updated:", response.data.song);
                navigate("/music");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const cancelEditing = () => {
        setShow(false);
        navigate("/music");
    };
    // console.log(currentSong);
    return (
        <div className="container px-5">
            <Modal show={show} onHide={cancelEditing} size="lg" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Song Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="title"
                                value={currentSong.title}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control
                                type="text"
                                name="artist"
                                placeholder="artist"
                                value={currentSong.artist}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Album</Form.Label>
                            <Form.Control
                                type="text"
                                name="album"
                                placeholder="album"
                                value={currentSong.album}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                name="genre"
                                placeholder="genre"
                                value={currentSong.genre}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelEditing}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateSong}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Song;
