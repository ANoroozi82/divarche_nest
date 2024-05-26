import React from "react";

export default function Button({value,className,id,onclick}){
    return(
        <button
        className={className}
        onClick={onclick}
        id={id}
        >{value}</button>
    )
}