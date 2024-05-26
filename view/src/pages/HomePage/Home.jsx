import React from "react";
import {useNavigate} from "react-router-dom";

export default function Home(){
    const navigate =useNavigate()
    function goToPageLogin() {
        navigate('/user/login')
    }

    return(
        <button
            onClick={()=>goToPageLogin()}
            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">signup/login</button>
    )
}