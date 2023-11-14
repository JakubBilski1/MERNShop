import Settings from './Settings'
import { useState } from 'react';
import { logout } from '../../Services/UserDataService';

function UserPanel(props) {
  const [showSettings, setShowSettings] = useState(false);
  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  return (
    <div className="bg-gray-800 p-8 rounded shadow-lg w-96">
        <div className="mb-4">
          <img
            src={props.userData.profileImage || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        </div>
        <p className="text-2xl font-semibold mb-2">{props.userData.nick}</p>
        <p className="text-gray-500">{props.userData.email}</p>
        <p className="mb-6">Jesteś członkiem od: {new Date(props.userData.createdAt).toLocaleDateString()}</p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-red transition duration-300"
          >
            Logout
          </button>
          <button
            onClick={toggleSettings}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue transition duration-300"
          >
            Settings
          </button>
        </div>
        {showSettings && <Settings />}
      </div>
  )
}

export default UserPanel
