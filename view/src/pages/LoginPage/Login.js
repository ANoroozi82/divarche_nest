import React from "react";
import {useNavigate} from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

export default function Login(){
    const navigate =useNavigate()
    const goToPageSignup =()=>{
        navigate('/user/signup')
    }
    return (
        <section className="vh-100 bg-image">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card bo">
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">sign in</h2>

                                    <form>

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <Input typeInput="text" id="form3Example1cg"
                                                   className="form-control form-control-lg"/>
                                            <label className="form-label" htmlFor="form3Example1cg">UserName</label>
                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <Input type="password" id="form3Example4cg"
                                                   className="form-control form-control-lg"/>
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <Button
                                                data-mdb-button-init data-mdb-ripple-init
                                                value='Register'
                                                className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                            />
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">create an account? <a
                                            onClick={()=>goToPageSignup()}
                                            className="fw-bold text-body"><u>signup here</u></a></p>

                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}