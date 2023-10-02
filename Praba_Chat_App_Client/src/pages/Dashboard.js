import React from 'react';
import Sidebar from '../component/Sidebar';
import { useNavigate } from 'react-router-dom';
function Dashboard(props) {
    const navigate = useNavigate()
    return (
        <div>
            <Sidebar>
            <h1>Dashboard</h1>
            <button onClick={()=>navigate("/product")}>Product</button>
            <button onClick={()=>navigate("/about")}>About</button>

            </Sidebar>
        </div>
    );
}

export default Dashboard;