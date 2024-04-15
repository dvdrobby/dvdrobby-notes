import React from "react";

const Button = (props)=>{
    const {text} = props;

    return (
        <button className="btn" type="submit">{text}</button>
    )
}

export default Button;