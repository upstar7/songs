import React, { useState } from "react";
import SongService from "../services/SongService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddSong = () => {
    const initialSongState = {
        id: null,
        title: "",
        album: "",
        artist: "",
        genre: "",
    };
    const [song, setSong] = useState(initialSongState);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSong({ ...song, [name]: value });
        // console.log(errors);
        if (!!errors[name])
            setErrors({
                ...errors,
                [name]: null,
            });
    };

    const findFormErrors = () => {
        const { title, artist, album, genre } = song;
        const newErrors = {};
        // name errors
        if (!title || title === "") newErrors.title = "Cannot be blank!";
        // food errors
        if (!artist || artist === "") newErrors.artist = "Cannot be blank!";
        // rating errors
        if (!album || album === "") newErrors.album = "Cannot be blank!";
        // comment errors
        if (!genre || genre === "") newErrors.genre = "Cannot be blank!";

        return newErrors;
    };
    const saveSong = (e) => {
        e.preventDefault();

        const newErrors = findFormErrors();
        console.log(newErrors);
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            // console.log("sadfsdfsdf");
            setErrors(newErrors);
        } else {
            var data = {
                title: song.title,
                artist: song.artist,
                album: song.album,
                genre: song.genre,
            };
            console.log(data);
            SongService.create(data)
                .then((response) => {
                    setSong({
                        id: response.data.id,
                        title: response.data.title,
                        artist: response.data.artist,
                        album: response.data.album,
                        genre: response.data.genre,
                        release_date: response.data.release_date,
                    });
                    setSubmitted(true);
                    console.log("sdfsdfsdfsd", response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const newSong = () => {
        setSong(initialSongState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form container">
            {submitted ? (
                <div className="">
                    <h3 className="text-center text-primary pt-5">
                        You added New Song successfully!
                    </h3>
                    <p className="text-center pt-5 fs-5">
                        If you want to add new song again
                        <span className="px-2">
                            <Button
                                className="btn btn-success"
                                onClick={newSong}
                            >
                                Click Here
                            </Button>
                        </span>
                    </p>
                </div>
            ) : (
                <div className="px-5">
                    <h3 className="text-center pt-5">Create New Song</h3>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={song.title}
                                onChange={handleInputChange}
                                isInvalid={!!errors.title}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Artist</Form.Label>
                            <Form.Control
                                type="text"
                                name="artist"
                                value={song.artist}
                                onChange={handleInputChange}
                                isInvalid={!!errors.artist}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.artist}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Album</Form.Label>
                            <Form.Control
                                type="text"
                                name="album"
                                value={song.album}
                                onChange={handleInputChange}
                                isInvalid={!!errors.album}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.album}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                type="text"
                                name="genre"
                                value={song.genre}
                                onChange={handleInputChange}
                                isInvalid={!!errors.genre}
                                autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.genre}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-end">
                            <Button
                                className="mt-5"
                                variant="primary"
                                onClick={saveSong}
                            >
                                Create Song
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default AddSong;
