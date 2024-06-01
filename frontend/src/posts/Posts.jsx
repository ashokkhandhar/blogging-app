import { useEffect, useState } from 'react';
import './Posts.css';
import PostCard from './PostCard';
import axiosInstance from '../config/axiosConfig';
import API_URL from '../apiurl';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`${API_URL}/post/all`, {}, { withCredentials: true });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="card-container">
      {posts.length && posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;