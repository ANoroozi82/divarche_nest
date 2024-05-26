import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage/Home";
import Signup from "../pages/SignupPage/Signup";
import Error404 from "../pages/ErrorPage/Error404";
import Login from "../pages/LoginPage/Login";

export default function App(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="user/signup" element={<Signup />} />
            <Route path="user/login" element={<Login />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
        </BrowserRouter>
    )
}