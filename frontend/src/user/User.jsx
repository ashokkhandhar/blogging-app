import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../navigation/footer";
import Header from "../navigation/header";
import './User.css';
import axiosInstance from '../config/axiosConfig';
import API_URL from '../apiurl';

const User = () => {
    const { username } = useParams();

    const user = JSON.parse(localStorage.getItem("userInfo"));
    const self = user && user.username === username;

    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);
    const [publicPostCount, setPublicPostCount] = useState(0);
    const [privatePostCount, setPrivatePostCount] = useState(0);
    const [postCount, setPostCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axiosInstance.get(`${API_URL}/user/profile/${username}`, {},  { withCredentials: true });
                setUserInfo(response1.data);
                const response2 = await axiosInstance.get(`${API_URL}/post/myPosts/?username=${username}`, {},  { withCredentials: true });
                if(self) {
                    setPosts(response2.data);
                } else {
                    setPosts(response2.data.filter(post => post.isPrivate === false));
                }
                setPostCount(response2.data.length);
                setPrivatePostCount(response2.data.filter(post => post.isPrivate === true).length);
                setPublicPostCount(response2.data.filter(post => post.isPrivate === false).length);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading user data: {error.message}</div>;
    }

    return (
        <>
            <Header />
            <div className="user-container">
                <div className="profile-card-container">
                    <div className="card profile-card-1">
                        <div className="profile-info">
                            <div className="profile-name">
                                Name:
                                <div className="profile-info-values">
                                    {userInfo.fullName}
                                </div>
                            </div>
                            <div className="profile-username">
                                Username:
                                <div className="profile-info-values">
                                    {userInfo.username}
                                </div>
                            </div>
                            <div className="profile-public-post-count">
                                Public posts:
                                <div className="profile-info-values">
                                    {publicPostCount}
                                </div>
                            </div>
                            {self && (
                                <>
                                    <div className="profile-private-post-count">
                                        Private posts:
                                        <div className="profile-info-values">
                                            {privatePostCount}
                                        </div>
                                    </div>
                                    <div className="profile-total-post-count">
                                        Total posts:
                                        <div className="profile-info-values">
                                            {postCount}
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="edit-profile-btn-container">
                                {self && (
                                    <a href="/updateProfile">
                                        <button className="btn edit-profile-btn">Edit Profile</button>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="card profile-card-2">
                        <h1 className="profile-card-2-title">Posts</h1>
                        {posts.map((post) => (
                            <div key={post._id} className="profile-posts-container">
                                <a className="title-container" href={`/post/${post._id}`}>
                                    <h1 className="profile-post-title">{post.title}</h1>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default User;