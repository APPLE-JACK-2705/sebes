import React, { useEffect, useState } from 'react'
import './design/NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function NavBar({ onLogout }){
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://10.8.26.88/user-role.php')
        .then(response => setUser(response.data))
        .catch(error => console.error('Не получена роль пользователя: ' + error))
    })

    const handleLogout = () => {
        onLogout();
        navigate('/sebes');
    }

    return (
        <div className='navbar'>
            <ul className='nav-links'>
                <li>
                    <Link to="/sebes/">Калькулятор</Link>
                </li>
                {user.role === 'EDITOR' && (
                    <li>
                        <Link to="/sebes/list">Редактирование</Link>
                    </li>
                )}
            </ul>
            <div className="user-info">
                <span>{user.fullName}</span>
                <button className="logout-btn" onClick={handleLogout}>Выйти</button>
            </div>
        </div>
    )
}

export default NavBar