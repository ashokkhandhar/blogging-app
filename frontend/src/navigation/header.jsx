import React, { useEffect, useState } from 'react';
import './header.css';
import logoLight from '../images/logo-light.png';
import axiosInstance from '../config/axiosConfig';
import API_URL from '../apiurl';
// import logoDark from '../images/logo-dark.png';
// import darkIcon from '../images/dark-mode.png';
// import lightIcon from '../images/light-mode.png';

const Header = () => {
    const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")) || "light");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));

    useEffect(() => {
        // const body = document.body;
        // body.dataset.theme = theme;

        // if(theme === "dark") {
        //     document.querySelector(".light-icon").classList.add("active");
        //     document.querySelector(".dark-logo").classList.add("active");
        // } else {
        //     document.querySelector(".dark-icon").classList.add("active");
        //     document.querySelector(".light-logo").classList.add("active");
        // }

        const handleScroll = () => {
            const navbar = document.getElementById("navigation");
            if (window.pageYOffset > 0) {
                navbar.classList.add("shadow");
            } else {
                navbar.classList.remove("shadow");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [theme]);

    const handleClickOutside = (event) => {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // const toggleTheme = () => {
    //     const newTheme = theme === "dark" ? "light" : "dark";
    //     setTheme(newTheme);
    //     localStorage.setItem("theme", JSON.stringify(newTheme));
    // };

    const toggleDropdown = () => {
        document.getElementById("myDropdown").classList.toggle("show");
    };

    const handleLogout = async () => {
        try {
          const response = await axiosInstance.post(API_URL + '/auth/logout', {}, {withCredentials: true});
          console.log(response);
          localStorage.removeItem('userInfo');
          setUser(undefined);
          window.location.reload();
        } catch(error) {
          console.log(error.response.data || "Error while logout, please try again");
        }
    }

    return (
        <header className="header">
            <div className="navigation" id="navigation">
                <div className="nav-list-1">
                    <a className="logo-container" href="/">
                        <img className="logo active light-logo" src={logoLight} alt="logo not found" />
                        {/* <img className="logo dark-logo" src={logoDark} alt="logo not found" /> */}
                    </a>
                </div>
                <div>
                    {/* <button className="theme-btn" onClick={toggleTheme}>
                        <img className='dark-icon' src={darkIcon} alt="dark icon not found" />
                        <img className='light-icon' src={lightIcon} alt="light icon not found" />
                    </button> */}
                    {user ? (
                        <div className="nav-list-2">
                            <a href="/newPost">
                                <button className="btn create-btn">Add Post</button>
                            </a>
                            <div className="dropdown">
                                <button onClick={toggleDropdown} className="dropbtn material-symbols-outlined">account_circle</button>
                                <div id="myDropdown" className="dropdown-content">
                                    <div className="dropdown-username">
                                        <a href={`/user/${user.username}`}>{user.username}</a>
                                    </div>
                                    <div className="dropdown-menu">
                                        <a href="/myPosts">
                                            <span className="material-symbols-outlined">description</span>
                                            My Posts
                                        </a>
                                        <a href="/profileSetting">
                                            <span className="material-symbols-outlined">settings</span>
                                            Settings
                                        </a>
                                        <a onClick={handleLogout}>
                                            <span className="material-symbols-outlined">logout</span>
                                            Logout
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="nav-list-2">
                            <a href="/login">
                                <button className="btn login-btn">Login</button>
                            </a>
                            <a href="/register">
                                <button className="btn register-btn">Register</button>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
