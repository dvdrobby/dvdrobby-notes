import { createContext, useContext, useReducer } from "react";
import {LoginReducer, InitialLoginState} from "../reducer";
import { type } from "@testing-library/user-event/dist/type";

export const userContext = createContext();

export const useUserContext = () => {
    return useContext(userContext);
}



const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(LoginReducer, InitialLoginState);
    return (
        <userContext.Provider value={{userState:state, userDispatch:dispatch}}>
            {children}
        </userContext.Provider>
    )
}

export default UserProvider;