import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import Home from './Home.jsx';
import Login from './userForms/Login.jsx';
import Register from './userForms/Register.jsx';
import Post from './viewpost/Post.jsx';
import User from './user/User.jsx';
import PostForm from './postForm/PostForm.jsx'
import PrivateRoute from './privateRoute.jsx';
import MyPosts from './myPosts/MyPosts.jsx';
import ProfileSetting from './profileSetting/ProfileSetting.jsx';
import UpdateProfile from './userForms/UpdateProfile.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/post/:postId" element={<Post/>} />
        <Route path="/user/:username" element={<User/>} />
        <Route path='/newPost' element={<PrivateRoute element={PostForm} /> } />
        <Route path='/editPost/:postId' element={<PrivateRoute element={PostForm} /> } />
        <Route path='/myPosts' element={<PrivateRoute element={MyPosts} /> } />
        <Route path='/profileSetting' element={<PrivateRoute element={ProfileSetting} /> } />
        <Route path='/updateProfile' element={<PrivateRoute element={UpdateProfile} /> } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);