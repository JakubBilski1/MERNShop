import React, { useEffect, useState } from 'react';
import { getSocket } from '../../Services/getSocket';

function Settings() {
  const socket = getSocket();
  const [data, setData] = useState({
    darkMode: true,
    country: '',
    city: '',
    phone: '',
    dob: '',
  });
  const [info, setInfo] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    socket.emit('update-settings', data);
    socket.on('is-settings-success', (response) => {
      console.log(response);
      response.message ? setInfo(response.message) : setInfo(response.errors);
    });
  };

  useEffect(() => {
    socket.emit('get-settings');
    socket.on('settings', (response) => {
      // Use the response to initialize the form data
      setData({
        darkMode: response.darkMode,
        country: response.country,
        city: response.city,
        phone: response.phone,
        dob: response.dob,
      });
    });
  }, [socket]);

  return (
    <form className="mt-4">
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          Dark Mode
        </label>
        <label className="switch">
          {console.log(data.darkMode)}
          <input 
            type="checkbox" 
            defaultChecked={data.darkMode} 
            name="darkMode" 
            onChange={(e) => handleChange(e)}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold">
          Country
        </label>
        <input
          type="text"
          name="country"
          defaultValue={data.country}
          onChange={e=>handleChange(e)}
          className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold">
          City
        </label>
        <input
          type="text"
          name="city"
          defaultValue={data.city}
          onChange={e=>handleChange(e)}
          className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold">
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          defaultValue={data.phone}
          onChange={e=>handleChange(e)}
          className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 text-sm font-bold">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          defaultValue={data.dob}
          onChange={e=>handleChange(e)}
          className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
        />
      </div>
      {info && (
        typeof info === 'string' ? (
          <p className="text-sm text-green-400 mb-4">{info}</p>
        ) : (
          info.map((error, index) => (
            <p key={index} className="text-sm text-red-600 mb-4">{error}</p>
          ))
        )
      )}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave}>
        Save
      </button>
    </form>
  )
}

export default Settings
