import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../navigation/footer';
import Header from '../navigation/header';
import './UserForms.css';
import API_URL from '../apiurl';
import axiosInstance from '../config/axiosConfig';

const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("userInfo")){
            navigate("/");
        }
    });

    const [usernameORemail, setUsernameORemail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { usernameORemail, password };

        try {
            const response = await axiosInstance.post(API_URL + '/auth/login', userData, {withCredentials: true});
            console.log("Login successful");
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <>
        <Header />
        <div className='form-container'>
            <form onSubmit={handleSubmit} method="POST" className="user-form">
                <h1 className="form-heading">Login</h1>
                <div className="input-container">
                    <input className="input" type="text" name="usernameORemail" placeholder="Username or Email" value={usernameORemail} onChange={(e) => setUsernameORemail(e.target.value)} required />
                </div>
                <div className="input-container">
                    <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />   
                </div>
                <button type="submit" className="btn submit-btn">Login</button>
                <div className="redirection">
                    Don't have Account?
                    <a href="/register"> Register</a>
                </div>
            </form>
        </div>
        <Footer />
        </>
    );
}

export default Login;