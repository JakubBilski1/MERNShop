import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserPanel from '../Components/UserPanel';
import DashboardCart from '../Components/DashboardCart';
import DashboardOrders from '../Components/DashboardOrders';
import DashboardTeams from '../Components/DashboardTeams';

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(userData.role === 'admin' ? 'admin' : 'user');

  useEffect(() => {
    axios.post('http://localhost:5000/u/dashboard', {}, { withCredentials: true })
      .then((res) => setUserData(res.data))
      .catch((err) => {
        if (err.response.status === 401) {
          console.log('Błąd uwierzytelnienia (401)');
          window.location.href = '/login';
        } else {
          console.log('Inny błąd:', err);
        }
      });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="flex items-center mb-4 flex-col">
          <form className="flex items-center space-x-4">
          {userData.role === 'admin' ? (
              <label className={`cursor-pointer ${selectedOption === 'admin' ? 'text-blue-500' : 'text-gray-400'}`}>
                AdminPanel
                <input
                  type="radio"
                  name="dashboardOption"
                  value="admin"
                  checked={selectedOption === 'admin'}
                  onChange={() => setSelectedOption('admin')}
                  className="hidden"
                />
              </label>
            ) : 
            <label className={`cursor-pointer ${selectedOption === 'user' ? 'text-blue-500' : 'text-gray-400'}`}>
                UserPanel
                <input
                  type="radio"
                  name="dashboardOption"
                  value="user"
                  checked={selectedOption === 'user'}
                  onChange={() => setSelectedOption('user')}
                  className="hidden"
                />
              </label>}
            <label className={`cursor-pointer ${selectedOption === 'basket' ? 'text-blue-500' : 'text-gray-400'}`}>
              Koszyk
              <input
                type="radio"
                name="dashboardOption"
                value="basket"
                checked={selectedOption === 'basket'}
                onChange={() => setSelectedOption('basket')}
                className="hidden"
              />
            </label>
            <label className={`cursor-pointer ${selectedOption === 'orders' ? 'text-blue-500' : 'text-gray-400'}`}>
              Zamówienia
              <input
                type="radio"
                name="dashboardOption"
                value="orders"
                checked={selectedOption === 'orders'}
                onChange={() => setSelectedOption('orders')}
                className="hidden"
              />
            </label>
            <label className={`cursor-pointer ${selectedOption === 'favorites' ? 'text-blue-500' : 'text-gray-400'}`}>
              Ulubione drużyny
              <input
                type="radio"
                name="dashboardOption"
                value="favorites"
                checked={selectedOption === 'favorites'}
                onChange={() => setSelectedOption('favorites')}
                className="hidden"
              />
            </label>
          </form>
          <div>
            {selectedOption === 'user' || selectedOption === 'admin' && <UserPanel userData={userData}/>}
            {selectedOption === 'basket' && <DashboardCart />}
            {selectedOption === 'orders' && <DashboardOrders />}
            {selectedOption === 'favorites' && <DashboardTeams />}
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
