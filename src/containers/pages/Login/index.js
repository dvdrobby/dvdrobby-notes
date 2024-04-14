import React, { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/moleculs/Button";
import Navbar from "../../organisms/Navbar/Navbar";
import { useUserContext } from "../../../utils/context/state";
import { loginAPI } from "../../../utils/auth";

const Login = () => {

    const userContext = useUserContext();
    const {userState, userDispatch} = userContext;
    const navigate = useNavigate();

    const [data, setData] = useState({
        email:"",
        password: "",
    })

    const [popUp, setPopUp] = useState("");

    useEffect(()=>{
        if(userState.isLoggedIn){
            navigate("/");
        }
    },[])
    const handleChange = (e)=>{
        setData({...data,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        userDispatch({type:"FETCH_START"})

        await loginAPI(data)
            .then( res => {
                userDispatch({type:"FETCH_LOGIN_SUCCESS", payload: res.user });
                setData({email:"", password: "",})
                navigate("/");
            })
            .catch( (err) => {
                userDispatch({type:"FETCH_FAILED"})
                setPopUp({status:"Login Failed"})
                console.log(err.message)
            })
    }
    return (
        <div className="container">
            <Navbar/>
            <div className="card">
                <p className="card-title">Login here</p>
                { userState.isError ? (<p className="failed">{popUp.status}</p>) : ""}
                <form onSubmit={handleSubmit}>
                <input onChange={handleChange} className="card-input" type="text" name="email" placeholder="email..." value={data.email}></input>
                <input onChange={handleChange} className="card-input" type="password" name="password" placeholder="password..." value={data.password}></input>
                <Button text="Login" />
                </form>
            </div>
        </div>
    )
}

export default Login;