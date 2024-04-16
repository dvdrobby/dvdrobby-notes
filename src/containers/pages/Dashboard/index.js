import Navbar from "../../organisms/Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import { useUserContext } from "../../../utils/context/state";
import { useEffect, useState } from "react";
import Button from "../../../components/moleculs/Button";
import "./dashboard.scss";
import { getNotes, postNotes, deleteNotes, updateNotes } from "../../../utils/fetch";

const Dashboard = () => {
    const user = useUserContext();
    const {userState, userDispatch} = user;
    const [notes, setNotes] = useState(false)


    const dataStorage = JSON.parse(localStorage.getItem("user"))

    const [data, setData] = useState({
        title:"",
        content:"",
    })

    useEffect(()=>{
        
        if(!localStorage.getItem('isLoggedIn')){
            window.location.href="/login";
        }
        
        console.log("render notes")
        
    },[])

   
    
    const [popUp, setPopUp]= useState(null);

    const generateNotes = async (dataId) => {
        const dataFetch = await getNotes(dataId).then(data=> data).catch(err => err);
        setNotes(dataFetch);
    }

    

    const handleChange = (e)=>{
        setData({...data,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        userDispatch({type:"FETCH_START"});
        
        if(data.title.length > 0 && data.content.length > 0 )
        {
            const dataPost = {
                uid:dataStorage.uid,
                title:data.title,
                content:data.content,
                date: new Date().getTime()
            }
            await postNotes(dataPost).then(res => {

                if(res){
                    userDispatch({type:"FETCH_POST_SUCCESS"})
                    showPopUp("Notes added");
                    generateNotes(dataStorage.uid);
                    return setData({
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

    const handleUpdateNotes= (notes)=>{
    
        setData({
            notesId: notes.id,
            title:notes.data.title,
            content:notes.data.content,
            button:"UPDATE"
        })
    }

    const onUpdateNotes= async (e) => {
        e.preventDefault();
        userDispatch({type:"FETCH_START"});

        const updateData = {
            userId: dataStorage.uid,
            notesId: data.notesId,
            title: data.title,
            content: data.content,
            date: new Date().getTime()
        }

        await updateNotes(updateData).then(res => {
            if(res){
                userDispatch({type:"FETCH_POST_SUCCESS"})
                showPopUp("Notes updated");
                generateNotes(dataStorage.uid);
                return setData({
                    title:"",
                    content:"",

                })
            }else{
                userDispatch({type:"FETCH_POST_FAILED"})
                return showPopUp("Update error");
            }
        })
    }

    const handleDeleteNotes= (data)=>{
        const dataNotes = {
            userId:dataStorage.uid,
            notesId: data,
        }
        if(window.confirm("Are you sure you want to delete")){
            deleteNotes(dataNotes)
        }
    }

    const onCancel = ()=>{
        setData({
            title:"",
            content:""
        })
    }

    return (
            <div className="container">
                <Navbar/>
                <div className="card-dashboard">
                    <p className="card-title">Notes App</p>
                    {
                        popUp && (<p className="success">{popUp.status}</p>)
                    }
            
                    <input type="text" name="title" className="card-input" placeholder="add title here.." value={data.title} onChange={handleChange}/>
                    <textarea type="text" name="content" className="card-input text" placeholder="add content here.." value={data.content} onChange={handleChange}/>
                    { data.button === "UPDATE" ?
                    (<div><Button text="Update" event={onUpdateNotes}/><Button text="Cancel" event={onCancel}/></div>)
                    :
                    (<Button text="Save" event={handleSubmit}/>)}
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
                                            <p className="card-notes-title" onClick={() => handleUpdateNotes(note)}><b>{note.data.title}</b></p>                 
                                            <p className="card-notes-date">{date}</p>                 
                                            <p className="card-notes-caption">{note.data.content}</p>    
                                            <button className="delete-notes" onClick={()=> handleDeleteNotes(note.id)}>delete notes</button>             
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