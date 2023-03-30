import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SongService from "../services/SongService";

import { Table } from "reactstrap";

const SongsList = () => {
    const [songs, setSongs] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        SongService.getAll()
            .then((response) => {
                setSongs(response.data.songs);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const findByTitle = () => {
        SongService.findByTitle(searchTitle)
            .then((response) => {
                console.log(response.data.songs);
                setSongs(response.data.songs);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const openSong = (rowId) => {
        const id = songs[rowId].id;
        navigate("/music/" + id);
    };

    const removeSong = (rowId) => {
        const id = songs[rowId].id;
        SongService.remove(id)
            .then((response) => {
                console.log(id);
                let newSongs = [...songs];
                newSongs.splice(rowId, 1);
                setSongs(newSongs);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        findByTitle();
    }

    return (
        <div className="container pt-3">
            <h3 className="text-center pt-5">Songs List</h3>
            <div className="row pt-3">
                <div className="col-md-4">
                    <div className="mb-3">
                        <form className="input-group" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by title"
                                value={searchTitle}
                                onChange={onChangeSearchTitle}
                            />
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={findByTitle}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="border rounded-2 py-2">
                <Table striped>
                    <thead className="text-center">
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Genre</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {songs.map((data, index) => {
                            return (
                                <tr key={data.id}>
                                    <td>{data.title}</td>
                                    <td>{data.artist}</td>
                                    <td>{data.album}</td>
                                    <td>{data.genre}</td>
                                    <td>{data.release_date}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary mx-2"
                                            onClick={() => openSong(index)}
                                        >
                                            <i className="far fa-edit action pr-2"></i>
                                        </button>
                                        <button
                                            onClick={() => removeSong(index)}
                                            className="btn btn-danger"
                                        >
                                            <i className="fas fa-trash action"></i>
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SongsList;
