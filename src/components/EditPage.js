import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from 'react-router-dom';
import './design/EditPage.css';
import axios from "axios";

function EditPage({ onLogout }){
    const [listSebes, setListSebes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://10.8.26.88/edit-sebes.php")
        .then(response => setListSebes(response.data))
        .catch(error => console.error('Не найден список себестоимости: ' + error));
    })

    const handleLogout = () => {
        onLogout();
        navigate('/sebes');
    }

    return(
        <div className="edit-page-container">
            <NavBar onLogout={handleLogout}></NavBar>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Наименование</th>
                        <th>Дата редактирования</th>
                        <th>Пользователь редактор</th>
                        <th>Переменные (М)</th>
                        <th>Постоянные (К)</th>
                        <th>Ср.пропускная способность</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {listSebes.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.service_name}</td>
                                <td>{item.update_date}</td>
                                <td>{item.update_user}</td>
                                <td>{item.variable_m}</td>
                                <td>{item.constant_k}</td>
                                <td>{item.average_bandwidth}</td>
                                <td>
                                    <Link to={`/sebes/${item.id}/edit`}>Редактировать</Link> 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default EditPage;