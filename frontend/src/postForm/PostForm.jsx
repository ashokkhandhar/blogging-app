import React, { useState, useEffect } from "react";
import axiosInstance from "../config/axiosConfig";
import API_URL from "../apiurl";
import Header from "../navigation/header";
import Footer from "../navigation/footer";
import './PostForm.css';
import { useParams, useNavigate } from "react-router-dom";

const PostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState(JSON.parse(localStorage.getItem("userInfo")).username);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if(postId) {
      setIsEdit(true);
      const fetchPost = async () => {
        try {
          const response = await axiosInstance.get(`${API_URL}/post/viewPost/${postId}`, {}, { withCredentials: true });
          const post = response.data;
          setUsername(post.username);
          setTitle(post.title);
          setDetail(post.detail);
          setIsPrivate(post.isPrivate);
        } catch (error) {
          console.log(error);
        }
      };

      fetchPost();
    }
  }, [postId]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEdit) {
        const postData = { postId, title, detail, isPrivate };
        await axiosInstance.put(`${API_URL}/post/editPost/`, postData, { withCredentials: true });
      } else {
        const postData = { username, title, detail, isPrivate };
        await axiosInstance.post(`${API_URL}/post/createPost`, postData, { withCredentials: true });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="newPost-container">
        <form onSubmit={handleSubmit} className="post-form">
          <h1>{isEdit ? "Edit Post" : "Create Post"}</h1>
          <input
            className="input"
            type="text"
            name="postTitle"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="input"
            name="postDetail"
            rows="10"
            placeholder="Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
          <label className="isPrivate" htmlFor="isPrivate">
            <input
              type="checkbox"
              name="isPrivate"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private to me
          </label>
          <button type="submit" className="btn submit-btn">
            Publish
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PostForm;