import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark px-5">
                <a href="/" className="navbar-brand">
                    Music Library
                </a>
                <div className="navbar-nav mr-auto px-2">
                    <li className="nav-item px-2">
                        <NavLink to={"/music"} className="nav-link">
                            Song List
                        </NavLink>
                    </li>
                    <li className="nav-item px-2">
                        <NavLink to={"/add"} className="nav-link">
                            Create Song
                        </NavLink>
                    </li>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
