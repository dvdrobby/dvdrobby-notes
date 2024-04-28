import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const navRef = useRef()

    const showNavbar = () =>{
        navRef.current.classList.toggle("show-bar")
    }

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
                    <div ref={navRef} className="nav-list">
                        <li className="nav-item"><Link to="/" >Home</Link></li>  
                        <li className="nav-item"><Link to="/register">Register</Link></li>
                        <li className="nav-item"><button className="btn" onClick={showNavbar}><FaTimes /></button></li>
                    </div>
                    <button className="bar" onClick={showNavbar}>
                        <FaBars />
                    </button>
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
                    <div ref={navRef} className="nav-list">
                        <li className="nav-item"><Link to="/" >Home</Link></li>  
                        <li className="nav-item"><Link to="/login">Login</Link></li>
                        <li className="nav-item"><button className="btn" onClick={showNavbar}><FaTimes /></button></li>
                    </div>
                    <button className="bar" onClick={showNavbar}>
                        <FaBars />
                    </button>
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
                    <div ref={navRef} className="nav-list">
                        <li className="nav-item">Hallo, {user.email}</li>
                        <li className="nav-item"><button className="logout-btn" onClick={logout}>Logout</button></li>
                        <li className="nav-item"><button className="btn" onClick={showNavbar}><FaTimes /></button></li>
                    </div>
                    <button className="bar" onClick={showNavbar}>
                        <FaBars />
                    </button>
                </ul>)
                : null}
            </div>
        )
    }

}

export default Navbar;