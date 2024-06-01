import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../navigation/header';
import Footer from '../navigation/footer';
import './ProfileSetting.css'; 
import axiosInstance from '../config/axiosConfig';
import API_URL from '../apiurl';

const ProfileSetting = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const username = JSON.parse(localStorage.getItem('userInfo')).username;
            try {
                const response = await axiosInstance.get(`${API_URL}/user/profile/${username}`);
                setUser(response.data);
            } catch(error) {
                console.log(error);
            }
        }

        fetchUserData();
    }, []);

    const handleUpdateProfile = () => {
        navigate('/updateProfile');
    };

    const handleDeleteProfile = async () => {
        try {
            const response = await axiosInstance.delete(`${API_URL}/user/delete`, {}, {withCredentials: true});
            console.log(response.data);
            localStorage.removeItem("userInfo");
            navigate('/');
        } catch(error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header />
            <div className="setting-container">
            {user ? (
                <div className="card">
                    <div className="profile-settings-container">
                        <h1 className="profile-settings-title">My Profile: </h1>
                        <table className="profile-settings-table">
                            <tbody>
                                <tr>
                                    <th>Name:</th>
                                    <td>{user.fullName}</td>
                                </tr>
                                <tr>
                                    <th>Username:</th>
                                    <td>{user.username}</td>
                                </tr>
                                <tr>
                                    <th>Password:</th>
                                    <td>**********</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn update-profile-btn" onClick={handleUpdateProfile}>Update Profile</button>
                        <button className="btn delete-profile-btn" onClick={handleDeleteProfile}>Delete Profile</button>
                    </div>
                </div>
            ) : (
                <h1 className="logout-content">Create profile or login to view profile detail.</h1>
            )}
            </div>
            <Footer />
        </>
    );
};

export default ProfileSetting;