import React, { useEffect, useState } from 'react';
import './design/HomePage.css';
import axios from 'axios';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

function HomePage({ onLogout }){
    const [speed, setSpeed] = useState('');
    const [results, setResults] = useState([]);
    const [speedDirty, setSpeedDirty] = useState(false);
    const [speedError, setSpeedError] = useState('Обязатальное поле: скорость');
    const [formValid, setFormValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(speedError){
            setFormValid(false);
        }else{
            setFormValid(true);
        }
    }, [speedError])

    const handleSpeed = (e) => {
        const value = e.target.value;
        setSpeed(value);
        if(!value){
            setSpeedError('Обязатальное поле: скорость');
        }else{
            setSpeedError('');
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name){
            case 'speed':
                setSpeedDirty(true)
                break
        }
    }

    const handleSubmit = async (serviceId) => {
        const data = {
            speed: parseInt(speed),
            serviceId: serviceId
        }

        axios.post('http://10.8.26.88/sebes.php', data)
        .then(response => setResults(response.data))
        .catch(error => console.error('Ошибка в расчетах себестоимости: ' + error));
    }

    const services = [
        {id: 1, name: 'Аренда каналов IPLC'},
        {id: 2, name: 'Аренда транзитных каналов'},
        {id: 3, name: 'Аренда цифровых каналов МГ (ВЗ)'},
        {id: 4, name: 'Аренда цифровых каналов местн'},
        {id: 5, name: 'Аренда цифровых каналов МН'},
        {id: 6, name: 'Интернет транзит'},
        {id: 7, name: 'Пред в аренду порта IP VPN в пределах обл (города)'},
        {id: 8, name: 'Пред в аренду порта IP VPN в пределах РК'},
        {id: 9, name: 'Пред в аренду порта IP VPN, международный*'},
        {id: 10, name: 'Пред дост к сети И-нет ISP-провайд по выдел лин'},
        {id: 11, name: 'Пред доступа к ЕШВИ ГО'},
        {id: 12, name: 'Пред доступа к сети Интернет по ADSL'},
        {id: 13, name: 'Пред доступа к сети Интернет по беспр техн CDMA'},
        {id: 14, name: 'Пред доступа к сети Интернет по выделенной линии'},
        {id: 15, name: 'Пред доступа к сети Интернет по техн FTTX'}
    ];

    const handleLogout = () => {
        onLogout();
        navigate('/sebes');
    }

    return(
        <div className='home-page-container'>
            <NavBar onLogout={handleLogout}></NavBar>
            <div className='form-section'>
                <label className='input-label-speed' htmlFor='speed-id'>Скорость (Мбит/с):
                    <input id='speed-id' onBlur={e => blurHandler(e)} className='speed-input' type='number' name='speed' value={speed} onChange={handleSpeed}></input>
                </label>
            </div>
            {(speedDirty && speedError) && <div style={{color: 'red', fontSize: '15px', marginTop: '8px'}}>{speedError}</div>}
            <div className='btn-container'>
                {services.map((service) => (
                    <button disabled={!formValid} className='btn' onClick={() => handleSubmit(service.id)} key={service.id}>{service.name}</button>
                ))}
            </div>
            <div className='table-container'>
                <table className='sebes-table'>
                    <thead>
                        <tr>
                            <th className='col-1'>Услуга</th>
                            <th className='col-2'>Скорость</th>
                            <th className='col-3'>Себестоимость, тг</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            results && results.map((item) => {
                                return (
                                    <tr key={item.serviceId}>
                                        <td className='col-1'>{item.serviceName}</td>
                                        <td className='col-2'>{item.speed}</td>
                                        <td className='col-3'>{item.error ? item.message : item.sebes}</td>
                                    </tr>  
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;