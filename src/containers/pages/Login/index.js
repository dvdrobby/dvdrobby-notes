import React, { useEffect, useState} from "react";
import Navbar from "../../organisms/Navbar/Navbar";
import { useUserContext } from "../../../utils/context/state";
import { loginAPI } from "../../../utils/auth";


const Login = () => {

    const userContext = useUserContext();
    const {userState, userDispatch} = userContext;

    const [data, setData] = useState({
        email:"",
        password: "",
    })

    const [popUp, setPopUp] = useState(null);
    const [notif, setNotif] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("isLoggedIn")){
            window.location.href="/";
        }
        if(notif){
            setPopUp("Login Failed")
            setTimeout(()=>{
                setPopUp(null)
                setNotif(false)
            },2000)
        }
    },[popUp, userState.isLoading])

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

                const dataUser = {
                    email: res.user.email,
                    uid: res.user.uid
                }

                const dataStorage = JSON.stringify(dataUser)

                userDispatch({type:"FETCH_LOGIN_SUCCESS", payload: dataUser });
                setData({email:"", password: "",})
                localStorage.setItem("user", dataStorage)
                localStorage.setItem("isLoggedIn", true)

            })
            .catch( (err) => {
                userDispatch({type:"FETCH_FAILED"})
                setNotif(true)
                console.log(err.message)
            })
    }
    return (
        <>
            <Navbar/>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <h1>Hello!!<br/><span>Welcome to the Login page!</span></h1>
                    <p className="popup">{popUp}</p>
                    <div className="card-input">
                        <input onChange={handleChange} type="text" name="email" placeholder="Email" value={data.email}/>
                    </div>
                    <div className="card-input">
                        <input onChange={handleChange} type="password" name="password" placeholder="Password" value={data.password}/>
                    </div>
                    <div className="card-input">
                    {userState.isLoading ? (
                            <input type="submit" className="disabled" value="Loading..."/>
                        ): (
                            <input type="submit" value="Login"/>   
                        )}
                    </div>
                </form>
            </div>
            
        </>
    )
}

export default Login;