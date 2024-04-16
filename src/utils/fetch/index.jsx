import { database } from "../../config/firebase";
import { ref, push, onValue, set, remove } from "firebase/database";

const db = database

export const postNotes =async (data) => {
    return new Promise(( resolve ) => {
        push(ref(db, 'notes/' + data.uid), {
            title:data.title,
            content: data.content,
            date: data.date
        });
        resolve(true) 
    } )
}

export const getNotes = async (dataId) =>{
    const urls = ref(db, `notes/${dataId}` )
    return new Promise((resolve, reject) =>{
        onValue(urls, (snapshot) =>{

            if(snapshot.val()){
                const data = []
                Object.keys(snapshot.val()).map(key =>{
                    data.push({
                        id:key,
                        data:snapshot.val()[key]
                    })
                })
                resolve(data)
            }
            reject(false)
        })
    })
}

export const updateNotes = (data) => {
    const urls =  ref(db, `notes/${data.userId}/${data.notesId}`)
    return new Promise(( resolve ) => {
        set(urls, {
            title:data.title,
            content: data.content,
            date: data.date
        });
        resolve(true) 
    } )
}

export const deleteNotes= (data)=>{
    const urls = ref(db, `notes/${data.userId}/${data.notesId}`);
    return remove(urls)
}