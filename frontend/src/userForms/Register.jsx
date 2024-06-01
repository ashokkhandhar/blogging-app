import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../navigation/footer';
import Header from '../navigation/header';
import './UserForms.css';
import API_URL from '../apiurl';
import axiosInstance from '../config/axiosConfig';

const Register = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("userInfo")){
            navigate("/");
        }
    });

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { fullName, username, email, password };

        try {
            const response = await axiosInstance.post(API_URL + '/auth/register', userData, {withCredentials: true});
            console.log("Register successful");
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            // setError(null);
            navigate('/');
        } catch(error) {
            // setError(error.response.data || "Error while signup, please signup again");
            console.log(error);
        }
    }

    return (
        <>
        <Header />
        <div className='form-container'>
            <form onSubmit={handleSubmit} method="POST" className="user-form">
                <h1 className="form-heading">Register</h1>
                <div className="input-container">
                    <input className="input" id="name" type="text" name="name" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                    <span id="name-error" className="error d-none">The name can't be empty.</span>
                </div>
                <div className="input-container">
                    <input className="input" id="username" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <span id="username-error" className="error d-none">The username must contain minimum three characters, only uppercase / lowercase letters, numbers and underscores.</span>
                </div>
                <div className="input-container">
                    <input className="input" id="email" type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <span id="email-error" className="error d-none">The email error</span>
                </div>
                <div className="input-container">
                    <input className="input" id="password" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <span id="password-error" className="error d-none">The password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.</span>
                </div>
                <button type="submit" className="btn submit-btn" id="register-submit">Register</button>
                <div className="redirection">
                    Have an Account?
                    <a href="/login"> Login</a>
                </div>
            </form>
        </div>
        <Footer />
        </>
    );
}

export default Register;