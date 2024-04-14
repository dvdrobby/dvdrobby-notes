import React from "react";
import { useUserContext } from "../../utils/context/state";

const Button = (props)=>{
    const {text} = props;
    const userContext = useUserContext();
    const {userState} = userContext;

    return (
        <button className={`btn ${userState.isLoading ? `disabled` : `` }`} type="submit">{text}</button>
    )
}

export default Button;