import React, { useEffect, useState } from 'react';
import UserPanel from '../Components/Dashboard/UserPanel';
import DashboardCart from '../Components/Dashboard/DashboardCart';
import DashboardOrders from '../Components/Dashboard/DashboardOrders';
import DashboardTeams from '../Components/Dashboard/DashboardTeams';
import { getUser } from '../Services/UserDataService';

function Dashboard() {
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(userData && (userData.role === 'admin' ? 'admin' : 'user'));

  useEffect(() => {
    const fetchUser = async () => {
      await getUser()
        .then((response) => {
          setUserData(response);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            window.location.href = '/login';
          }else if(error){
            console.log(error);
          }
        });
    }
    fetchUser();
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
            {(selectedOption === 'user' || selectedOption === 'admin') && <UserPanel userData={userData}/>}
            {selectedOption === 'basket' && <DashboardCart />}
            {selectedOption === 'orders' && <DashboardOrders />}
            {selectedOption === 'favorites' && <DashboardTeams />}
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
