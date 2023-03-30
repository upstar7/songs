import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import SongsList from "./components/SongsList";
import Song from "./components/Song";
import AddSong from "./components/AddSong";
import NavBar from "./components/NavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

function App() {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/music" exact element={<SongsList />} />
                    <Route path="/add" exact element={<AddSong />} />
                    <Route path="/music/:id" exact element={<Song />} />
                    <Route
                        path="/"
                        element={<Navigate to="/music" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
