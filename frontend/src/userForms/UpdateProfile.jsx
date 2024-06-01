import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../navigation/footer';
import Header from '../navigation/header';
import './UserForms.css';
import API_URL from '../apiurl';
import axiosInstance from '../config/axiosConfig';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (!userInfo) {
            navigate("/login");
        } else {
            const user = JSON.parse(userInfo);
            setFullName(user.fullName);
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch(`${API_URL}/user/update`, {
                fullName,
                username,
                oldPassword,
                newPassword
            }, { withCredentials: true });
            console.log(response.data);
            
            const updatedUser = { ...JSON.parse(localStorage.getItem('userInfo')), fullName, username };
            localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            navigate("/profileSetting");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className='form-container'>
                <form onSubmit={handleSubmit} className="user-form">
                    <h1 className="form-heading">Update Profile</h1>
                    <div className="input-container">
                        <input
                            className="input"
                            id="newName"
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <span id="newName-error" className="error d-none">The name can't be empty.</span>
                    </div>
                    <div className="input-container">
                        <input
                            className="input"
                            id="newUsername"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span id="newUsername-error" className="error d-none">The username must contain minimum three characters, only uppercase/lowercase letters, numbers, and underscores.</span>
                    </div>
                    <div className="input-container">
                        <input
                            className="input"
                            id="newEmail"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span id="newUsername-error" className="error d-none">The username must contain minimum three characters, only uppercase/lowercase letters, numbers, and underscores.</span>
                    </div>
                    <div className="input-container">
                        <input
                            className="input"
                            type="password"
                            name="oldPassword"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            className="input"
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span id="newPassword-error" className="error d-none">The password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character.</span>
                    </div>
                    <button type="submit" className="btn submit-btn" id="update-profile-btn">Update</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default UpdateProfile;