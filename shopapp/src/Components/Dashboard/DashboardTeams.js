import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getUser } from '../../Services/UserDataService';
import { getNBATeams } from '../../Services/UserDataService';
import FavTeams from '../TeamsComponents/FavTeams';
import FullPopUp from '../TeamsComponents/FullPopUp';

function DashboardTeams() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [teamsfromDB, setTeamsfromDB] = useState([]);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      const nbaDataRes = await getNBATeams();
      setData(nbaDataRes);

      const favTeamsRes = await getUser();
      setTeamsfromDB(favTeamsRes.favTeams);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-800 p-8 rounded shadow-lg w-96 relative flex justify-around">
      <button
        className="bg-gray-600 rounded-full p-4 text-white focus:outline-none"
        onClick={togglePopup}
      >
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
      </button>
      <FavTeams teamsfromDB={teamsfromDB} />
      <FullPopUp isPopupVisible={isPopupVisible} togglePopup={togglePopup} teamsfromDB={teamsfromDB} data={data}/>
    </div>
  );
}

export default DashboardTeams;
