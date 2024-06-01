import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../navigation/header';
import Footer from '../navigation/footer';
import './Post.css';
import axiosInstance from '../config/axiosConfig';
import API_URL from '../apiurl';

const Post = () => {
  const { postId } = useParams();

  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [post, setPost] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/post/viewPost/${postId}`, { withCredentials: true });
            setPost(response.data);
        } catch(error) {
            console.log(error);
        }
    };
    fetchPost();
  }, [postId]);

  const handleDeletePost = async (e) => {
    e.preventDefault();
    try {
        const response = await axiosInstance.delete(`${API_URL}/post/deletePost/${postId}`, { withCredentials: true });
        console.log(response);
        navigate("/");
    } catch(error) {
        console.log(error);
    }
  }

  return (
    <>
        <Header/>
        <div className="post-container">
            <div className="card">
                <h1 className="full-post-title">{post.title}</h1>
                <code className="date">{new Date(post.date).toLocaleDateString()}</code>
                {user && user.username === post.username ? (
                    <>
                    <div className="detail">{post.detail}</div>
                    <div className="tag">
                        {post.isPrivate ? <code>Private</code> : <code>Public</code>}
                    </div>
                    <div className="edit-del-btn-container">
                        <a href={`/editPost/${post._id}`}>
                            <button className="edit-btn">Edit</button>
                        </a>
                        <button className="del-btn" onClick={handleDeletePost}>Delete</button>
                    </div>
                    </>
                ) : (
                    <>
                    <a className="author" href={`/user/${post.username}`}>
                        <code><i>{post.username}</i></code>
                    </a>
                    <div className="detail">{post.detail}</div>
                    </>
                )}
            </div>
        </div>
        <Footer/>
    </>
  );
};

export default Post;