import Navbar from "../../organisms/Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import { useUserContext } from "../../../utils/context/state";
import { useEffect, useState } from "react";
import Button from "../../../components/moleculs/Button";
import "./dashboard.scss";
import { getNotes, postNotes } from "../../../utils/fetch";

const Dashboard = () => {
    const user = useUserContext();
    const {userState, userDispatch} = user;
    const [notes, setNotes] = useState(false)


    const dataStorage = JSON.parse(localStorage.getItem("user"))

    useEffect(()=>{
        
        if(!localStorage.getItem('isLoggedIn')){
            window.location.href="/login";
        }
        generateNotes(dataStorage.uid);
        
    },[notes])

    const [data, setData] = useState({
        uid: "",
        title:"",
        content:"",
        date:new Date().getTime()
    })
    
    const [popUp, setPopUp]= useState(null);

    const generateNotes = async (dataId) => {
        const dataFetch = await getNotes(dataId).then(data=> data).catch(err => err);
        console.log("fecth ",dataFetch)
        setNotes(dataFetch);
    }

    

    const handleChange = (e)=>{
        setData({...data,
            uid:dataStorage.uid,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        userDispatch({type:"FETCH_START"});

        if(data.title.length > 0 && data.content.length > 0 )
        {
            await postNotes(data).then(res => {

                if(res){
                    userDispatch({type:"FETCH_POST_SUCCESS"})
                    showPopUp("Notes added");
                    return setData({
                        ...data,
                        title:"",
                        content:"",
    
                    })
                }
            })
        }else{
            userDispatch({type:"FETCH_POST_FAILED"})
            return showPopUp("Title and Content must be filled");

        }
        
        

    }


    const showPopUp = (status)=>{
        setTimeout(()=>{
            setPopUp({status:status})
        },3000)
        setPopUp(null)
    }

    return (
            <div className="container">
                <Navbar/>
                <div className="card-dashboard">
                    <p className="card-title">Notes App</p>
                    {
                        popUp && (<p className="success">{popUp.status}</p>)
                    }
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" className="card-input" placeholder="add title here.." value={data.title} onChange={handleChange}/>
                        <textarea type="text" name="content" className="card-input text" placeholder="add content here.." value={data.content} onChange={handleChange}/>
                        {userState.isLoading ?
                        (<button className="btn disabled">Loading..</button>)
                        :
                        (<Button text="Save"/>)}
                    </form>
                </div>
                {
                    notes &&
                    (
                        <>
                            {
                                notes.map((note)=>{

                                    const getDate = new Date(note.data.date);
                                    const date = getDate.toDateString()
                                    return (
                                        <div className="card-list" key={note.id}>
                                            <p className="card-notes-title"><b>{note.data.title}</b></p>                 
                                            <p className="card-notes-date">{date}</p>                 
                                            <p className="card-notes-caption">{note.data.content}</p>                 
                                        </div>
                                    )
                                })
                            }
                        
                        </>
                    )
                }
            </div>
    )
}

export default Dashboard;