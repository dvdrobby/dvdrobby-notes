import React from "react";

const Button = (props)=>{
    const {text, event} = props;

    return (
        <button className="btn" type="submit" onClick={event}>{text}</button>
    )
}

export default Button;