import Navbar from "../../organisms/Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import { useUserContext } from "../../../utils/context/state";
import { useEffect } from "react";

const Dashboard = () => {
    const user = useUserContext();
    const navigate = useNavigate();
    const {userState} = user;
    

    useEffect(()=>{
        if(!userState.isLoggedIn){
            navigate("/login");
        }

    },[])

    return (
        <div className="container">
            <Navbar/>
            <div className="card">Hallo</div>
        </div>
    )
}

export default Dashboard;