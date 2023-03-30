import React, { useState } from "react";
import SongService from "../services/SongService";

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
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSong({ ...song, [name]: value });
    };
    const saveSong = () => {
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
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
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
                            <button
                                className="btn btn-success"
                                onClick={newSong}
                            >
                                Click Here
                            </button>
                        </span>
                    </p>
                </div>
            ) : (
                <div className="px-5">
                    <h3 className="text-center pt-5">Create New Song</h3>
                    <div className="form-group pt-3">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={song.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>
                    <div className="form-group pt-5">
                        <label htmlFor="artist">Artist</label>
                        <input
                            type="text"
                            className="form-control"
                            id="artist"
                            required
                            value={song.artist}
                            onChange={handleInputChange}
                            name="artist"
                        />
                    </div>
                    <div className="form-group pt-5">
                        <label htmlFor="album">Album</label>
                        <input
                            type="text"
                            className="form-control"
                            id="album"
                            required
                            value={song.album}
                            onChange={handleInputChange}
                            name="album"
                        />
                    </div>
                    <div className="form-group pt-5">
                        <label htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="genre"
                            required
                            value={song.genre}
                            onChange={handleInputChange}
                            name="genre"
                        />
                    </div>

                    <button onClick={saveSong} className="btn btn-success mt-5">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddSong;
