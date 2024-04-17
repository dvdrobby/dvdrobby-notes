import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    if(window.location.pathname == "/login"){
        return (
            <div>
                <ul className="nav">
                    <div className="logo">
                        Notes App
                    </div>
                    <div className="nav-list">
                        <li className="nav-item"><Link to="/" >Home</Link></li>  
                        <li className="nav-item"><Link to="/register">Register</Link></li>
                </div>
                </ul>
            </div>
                )
    }else if(window.location.pathname == "/register"){
        return (
            <div>
                <ul className="nav">
                    <div className="logo">
                        Notes App
                    </div>
                    <div className="nav-list">
                        <li className="nav-item"><Link to="/" >Home</Link></li>  
                        <li className="nav-item"><Link to="/login">Login</Link></li>
                    </div>
                </ul>
            </div>
        )
    }else{
        return (
            <div>
                { user && !null ? 
                (<ul className="nav">
                    <div className="logo">
                        Notes App
                    </div>
                    <div className="nav-list">
                        <li className="nav-item">Hallo, {user.email}</li>
                        <li className="nav-item"><button className="logout-btn" onClick={logout}>Logout</button></li>
                    </div>
                </ul>)
                : null}
            </div>
        )
    }

}

export default Navbar;