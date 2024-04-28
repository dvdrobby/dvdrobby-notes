import React, { useEffect, useState } from "react";
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
    const [notif, setNotif] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        userDispatch({type:"FETCH_START"});

        await registerAPI(data).then((res) => 
            {   
                console.log(res.user)
                userDispatch({type:"FETCH_REGISTER_SUCCESS", payload: res.user });
                setNotif("success")
                setData({email:"", password: "",})
            })
            .catch(() =>{
                 userDispatch({type:"FETCH_FAILED"})
                 setNotif("failed")
                })
    }
            
    useEffect(()=>{
        if(notif==='success'){
            setPopUp("Register Success")
            setTimeout(()=>{
                setPopUp("")
                setNotif(false)
            },2000)
        }else if(notif==="failed"){
            setPopUp("Register Failed")
            setTimeout(()=>{
                setPopUp("")
                setNotif(false)
            },2000)
        }else{
            setPopUp("")
            setNotif(false)
        }
    },[popUp, userState.isLoading])

    const handleChange = (e)=>{
        setData({...data,
            [e.target.name] : e.target.value
        })
    }



    return (
        <>
            <Navbar/>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <h1>Don't have account?<br/><span>Please register</span></h1>
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
                            <input type="submit" value="Register"/>  
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register;