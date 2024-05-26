import React from "react";
import './Error404.css'
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";


export default function Error404() {
    const navigate = useNavigate()
    const goToNewPage = () => {
      navigate('/')
    }
    return (
        <div className="error">
            <div className="container-floud">
                <div className="col-xs-12 ground-color text-center">
                    <div className="container-error-404">
                        <div className="clip">
                            <div className="shadow"><span className="digit thirdDigit">4</span></div>
                        </div>
                        <div className="clip">
                            <div className="shadow"><span className="digit secondDigit">0</span></div>
                        </div>
                        <div className="clip">
                            <div className="shadow"><span className="digit firstDigit">4</span></div>
                        </div>
                        <div className="msg">OH!<span className="triangle"></span></div>
                    </div>
                    <h2 className="h1">Sorry! Page not found</h2>
                    <Button
                        className='btn btn-outline-warning'
                        value='Home Page'
                        onclick={()=>goToNewPage()}
                    />
                </div>
            </div>

        </div>

    )
}

