import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div >
                { user && !null ? 
                (<ul className="nav">
                    <li className="nav-item">Hallo, {user.email}</li>
                    <li className="nav-item"><button className="logout-btn" onClick={logout}>Logout</button></li>
                </ul>)
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