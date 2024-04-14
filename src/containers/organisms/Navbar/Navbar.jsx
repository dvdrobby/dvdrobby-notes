import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useUserContext } from "../../../utils/context/state";

const Navbar = () => {

    const user = useUserContext();
    const {userState} = user;

    return (
        <div className="container">
                { userState.isLoggedIn ? 
                (<ul className="nav"><li className="nav-item">Hallo, {userState.user.email}</li></ul>)
                :
                (
                <ul className="nav">
                    <li className="nav-item"><Link to="/" >Home</Link></li>  
                    <li className="nav-item"><Link to="/register">Register</Link></li>
                    <li className="nav-item"><Link to="/login">Login</Link></li>
                </ul>
                )
            }
        </div>
    )
}

export default Navbar;