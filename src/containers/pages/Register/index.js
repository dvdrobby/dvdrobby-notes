import React, {useRef, useState, useEffect} from "react";
import Button from "../../../components/moleculs/Button";
import "./register.scss";
import Navbar from "../../organisms/Navbar/Navbar";
import { registerAPI } from "../../../utils/auth";
import { useUserContext } from "../../../utils/context/state";

const Register = () => {
    const userContext = useUserContext();
    const {userState, userDispatch} = userContext;
    
    const [data, setData] = useState({
        email:"",
        password:""
    });

    const [popUp, setPopUp] = useState("")

    const emailRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        userDispatch({type:"FETCH_START"});

        await registerAPI(data).then((res) => 
            {   
                console.log(res.user)
                userDispatch({type:"FETCH_REGISTER_SUCCESS", payload: res.user });
                setPopUp({status: "Register Success"})
                setData({email:"", password: "",})
            })
            .catch(() =>{
                 userDispatch({type:"FETCH_FAILED"})
                 setPopUp({status: "Register Failed"})
                })
            }


    const handleChange = (e)=>{
        setData({...data,
            [e.target.name] : e.target.value
        })
    }



    return (
        <div className="container">
            <Navbar/>
            <div className="card">
                <p className="card-title">Register here</p>
                { userState.isSuccess ? (<p className="success">{popUp.status}</p>) : (<p className="failed">{popUp.status}</p>)}
                <form onSubmit={handleSubmit}>
                    <input ref={emailRef} onChange={handleChange} className="card-input" type="text" name="email" placeholder="email..." value={data.email}></input>
                    <input ref={passRef} onChange={handleChange} className="card-input" type="password" name="password" placeholder="password..." value={data.password}></input>
                    {userState.isLoading ? (
                        <button className="btn disabled">Loading..</button>
                    ): (
                        <Button text="Register"/>   
                    )}
                </form>
                
            </div>
        </div>
    )
}

export default Register;