import { useEffect, useState } from 'react';
import './MyPosts.css';
import axiosInstance from '../config/axiosConfig';
import API_URL from '../apiurl';
import Header from '../navigation/header';
import Footer from '../navigation/footer';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/post/myPosts/?username=${user.username}`, { withCredentials: true });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [user.username]);

  return (
    <>
    <Header/>
    <div className="card-container">
      {posts.map(post => (
        <div className="card" key={post._id}>
          <a className="title-container" href={`/post/${post._id}`}>
            <h1 className="title">{post.title}</h1>
          </a>
          <code className="date">{new Date(post.date).toLocaleDateString()}</code>
          <div className="detail">
            {post.detail.length > 100 ? (
              <>
                {post.detail.slice(0, 100)}...
                <a href={`/post/${post._id}`} className="read-more">Read More</a>
              </>
            ) : (
              post.detail
            )}
          </div>
          <div className="tag">
            <code>{post.isPrivate ? 'Private' : 'Public'}</code>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default MyPosts;