import React, { useState, useEffect } from "react";
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
        navigate("/music");
    };
    // console.log(currentSong);
    return (
        <div className="container px-5">
            <h3 className="text-center pt-5">Song Details</h3>
            <div className="form-group pt-2">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={currentSong.title}
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
                    value={currentSong.artist}
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
                    value={currentSong.album}
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
                    value={currentSong.genre}
                    onChange={handleInputChange}
                    name="genre"
                />
            </div>

            <button onClick={updateSong} className="btn btn-success mt-5">
                Update
            </button>
            <button
                onClick={cancelEditing}
                className="btn btn-danger mt-5 mx-4"
            >
                Cancel
            </button>
        </div>
    );
};

export default Song;
