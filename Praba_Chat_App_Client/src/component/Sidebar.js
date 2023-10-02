import React, { useState } from 'react';
import { FaCommentAlt, FaRegChartBar, FaStar, FaShoppingBag, FaThList, FaBars, FaTh, FaUserAlt, FaUser } from "react-icons/fa"
import { NavLink } from 'react-router-dom';
import "./../sidebar.css"

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/friend",
            name: "Friends",
            icon: <FaUserAlt />
        },
        {
            path: "/gallery",
            name: "Gallery",
            icon: <FaRegChartBar />
        },
        {
            path: "/setting",
            name: "Settings",
            icon: <FaCommentAlt />
        },
        // {
        //     path: "/product",
        //     name:"Product",
        //     icon: <FaShoppingBag/>
        // },
        // {
        //     path: "/productlist",
        //     name:"Productlist",
        //     icon: <FaThList/>
        // },
    ]

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light" style={{background:"#042483"}} >
                <a class="navbar-brand" href="#"><FaStar /> Chat Application</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                    <ul class="navbar-nav">

                        <li class="nav-item dropdown" style={{ margin: "0 7em 0 0" }}>
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <FaUser />
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item" href="#">Profile</a>
                                <a class="dropdown-item" href="#">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className='s_container '>
                {/* <div style={{width:isOpen?"300px" : "100px"}} className='s_sidebar'> */}

                <div style={{ width: "300px",background:"black" }} className='s_sidebar ' >

                   
                    {menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="s_link " activeclassName="active">
                            <div className='s_icon'>{item.icon}</div>
                            <div style={{ display:"block" }} className='link_text'>{item.name}</div>

                        </NavLink>
                    ))}
                </div>
                <main className='bg-light'>{children}</main>
            </div>
        </>
    )
}

export default Sidebar;