import Navbar from "../../organisms/Navbar/Navbar";
import { useUserContext } from "../../../utils/context/state";
import { useEffect, useState } from "react";
import { getNotes, postNotes, deleteNotes, updateNotes } from "../../../utils/fetch";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
    const user = useUserContext();
    const { userDispatch} = user;
    const [notes, setNotes] = useState("")


    const dataStorage = JSON.parse(localStorage.getItem("user"))

    const [data, setData] = useState({
        title:"",
        content:"",
    })

    const [popUp, setPopUp]= useState("");
    const [notif, setNotif]= useState(false);

    useEffect(()=>{
        
        if(dataStorage){
            generateNotes(dataStorage.uid)
        }

        if(notif==="post_success"){
            setPopUp("Notes Added")
            setTimeout(()=>{
                setPopUp("")
                setNotif(false)
            }, 2000)
        }else if(notif==="update_success"){
            setPopUp("Update notes success")
            setTimeout(()=>{
                setPopUp("")
                setNotif(false)
            }, 2000)
        }else if(notif==="update_failed"){
            setPopUp("Something error")
            setTimeout(()=>{
                setPopUp("")
                setNotif(false)
            }, 2000)
        }else if(notif==="required"){
            setPopUp("Input required")
            setTimeout(()=>{
                setPopUp("")
                setNotif(false)
            }, 2000)
        }

        
    },[data, popUp])

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
                    setNotif("post_success")
                    generateNotes(dataStorage.uid);
                    return setData({
                        title:"",
                        content:"",
    
                    })
                }
            })
        }else{
            userDispatch({type:"FETCH_POST_FAILED"})
            setNotif("required")
        }
        generateNotes(dataStorage.uid);

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
        userDispatch({ type:"FETCH_START" });

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
                setNotif("update_success")
                generateNotes(dataStorage.uid)
                return setData({
                    title:"",
                    content:"",

                })
            }else{
                userDispatch({type:"FETCH_POST_FAILED"})
                setNotif("update_failed")
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
            generateNotes(dataStorage.uid);
        }
    }

    const onCancel = ()=>{
        setData({
            title:"",
            content:""
        })
    }

    if(dataStorage){
        
        return (
                <>
                    <Navbar/>
                    <div className="card-notes">
                        <h1>Add Note</h1>
                        <p className="popup">{popUp}</p>                
                        <input type="text" name="title" className="card-input" placeholder="Title" value={data.title} onChange={handleChange}/>
                        <textarea type="text" name="content" className="card-input text" placeholder="Note" value={data.content} onChange={handleChange}/>
                        { data.button === "UPDATE" ?
                        (<div><button onClick={onUpdateNotes}>Update</button><button  onClick={onCancel}>Cancel</button></div>)
                        :
                        (<button onClick={handleSubmit}>Save</button>)}
                    </div>
                    <section className="notes-container">
                        {
                            notes &&
                            (
                                <>
                                    {
                                        notes.map((note)=>{
    
                                            const getDate = new Date(note.data.date);
                                            const date = getDate.toDateString()
                                            return (
                                                
                                                    <div className="notes-list" key={note.id}>
                                                        <h1 onClick={() => handleUpdateNotes(note)}><b>{note.data.title}</b></h1>                 
                                                        <p className="card-notes-date">{date}</p>                 
                                                        <p className="card-notes-caption">{note.data.content}</p>    
                                                        <button className="delete-notes" onClick={()=> handleDeleteNotes(note.id)}>Delete Note</button>             
                                                    </div>
                                            )
                                        })
                                    }
                                
                                </>
                            )
                        }
    
                    </section>
                </>
        )

    }else{
        return <Navigate to="/login"/>
    }
    

}

export default Dashboard;