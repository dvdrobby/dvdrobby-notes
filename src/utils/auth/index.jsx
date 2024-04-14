import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../config/firebase";

export const registerAPI = async (data) => {

    const {email, password} = data;
    return createUserWithEmailAndPassword(auth, email, password);

}

export const loginAPI = async (data) => {
    const {email, password} = data;
    return signInWithEmailAndPassword(auth, email, password);
}