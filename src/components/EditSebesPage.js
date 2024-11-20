import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditSebesPage(){
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);

  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://10.8.26.88/edit-sebes.php/${id}`)
    .then(response => setInputs(response.data))
    .catch(error => console.error(`Не найден данные о себестомости услуги ${id}: ` + error));
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    //Дописать запрос на сервер для обновления данных по себестоимости
    axios.put()

  }

  return (
    <form>
      <div className='input-block'>
        <label>Переменные (М)</label>
        <input type='number' className='form-control' name='variable_m' onChange={handleChange}></input>
      </div>
      <div className='input-block'>
        <label>Постоянные (К)</label>
        <input type='number' className='form-control' name='constant_k' onChange={handleChange}></input>
      </div>
      <div className='input-block'>
        <label>Ср.пропускная способность</label>
        <input type='number' className='form-control' name='average_bandwidth' onChange={handleChange}></input>
      </div>
      <button type='submit' name='update' className='update-button'>OK</button>
    </form>
  )
}

export default EditSebesPage