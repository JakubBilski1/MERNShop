import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import plTeams from '../Entities/pl';
import axios from 'axios';

function DashboardTeams() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [showNBATeams, setShowNBATeams] = useState(false);
  const [showPLTeams, setShowPLTeams] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teamsfromDB, setTeamsfromDB] = useState([]);
  const [allSelectedTeams, setAllSelectedTeams] = useState([]);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const toggleNBATeams = () => {
    setShowNBATeams((prevState) => !prevState);
  };

  const togglePLTeams = (e) => {
    e.preventDefault();
    setShowPLTeams((prevState) => !prevState);
  };

  useEffect(() => {
    axios
      .post('http://localhost:5000/d/nba', {}, { withCredentials: true })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));

    axios
      .post('http://localhost:5000/u/dashboard', {}, { withCredentials: true })
      .then((res) => setTeamsfromDB(res.data.favTeams))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
  
    if (e.target.checked) {
      setSelectedTeams((prevTeams) => [...prevTeams, value]);
    } else {
      // Remove the unselected team from the selectedTeams state
      setSelectedTeams((prevTeams) => prevTeams.filter((team) => team !== value));
      
      // Remove the unselected team from the allSelectedTeams state
      setAllSelectedTeams((prevAllSelectedTeams) => prevAllSelectedTeams.filter((team) => team !== value));
    }
  };
  

  const handleClick = (e) => {
    e.preventDefault();
  
    const nbaSelectedTeams = data
      .filter((team) => selectedTeams.includes(team.team_name))
      .map((team) => team.team_name);
  
    const plSelectedTeams = plTeams
      .filter((team) => selectedTeams.includes(team.name))
      .map((team) => team.name);
  
    const dbSelectedTeams = teamsfromDB;
  
    const newAllSelectedTeams = [...nbaSelectedTeams, ...plSelectedTeams, ...dbSelectedTeams];
    setAllSelectedTeams(newAllSelectedTeams);
    console.log(newAllSelectedTeams);
  
    /*axios
      .post('http://localhost:5000/u/updateData', { selectedTeams: newAllSelectedTeams }, { withCredentials: true })
      .then((res) => {
        // Handle the response if needed
        console.log(res.data);
      })
      .catch((err) => console.error(err));*/
  };
  

  const checkIfChecked = (team) => {
    return teamsfromDB.includes(team);
  };

  return (
    <div className="bg-gray-800 p-8 rounded shadow-lg w-96 relative">
      <button
        className="bg-gray-600 rounded-full p-4 text-white focus:outline-none"
        onClick={togglePopup}
      >
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
      </button>

      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-600 p-8 rounded shadow-lg relative min-h-[70vh] w-[20%]">
            <div className="relative">
              <p className="text-white text-lg font-bold mb-4">Dodaj ulubione drużyny:</p>
              <button
                className="absolute top-0 right-0 m-2 text-black"
                onClick={togglePopup}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <hr className="my-4 border-gray-400" />
            <button
              onClick={toggleNBATeams}
              className="flex items-center gap-2 p-[5px] text-white w-[100%]"
            >
              <img
                src="https://cdn.nba.com/logos/leagues/logo-nba.svg"
                alt="NBA"
              />
            </button>
            <hr className="my-4 border-gray-400" />
            <form>
              {showNBATeams && (
                <div className="max-h-60 overflow-y-auto">
                  {data &&
                    data.map((team) => (
                      <label
                        key={team.id}
                        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700 transition duration-300"
                      >
                        <div className='flex gap-[5px]'>
                          <input
                            type="checkbox"
                            name={team.team_name}
                            id=""
                            value={team.team_name}
                            defaultChecked={checkIfChecked(team.team_name)}
                            onChange={handleChange}
                          />
                          <p className="text-white">{team.team_name}</p>
                        </div>
                        <img
                          src={team.image}
                          alt={team.team_name}
                          className="w-12 h-12 object-cover"
                        />
                      </label>
                    ))}
                </div>
              )}
              <button className='flex items-center gap-2 text-white' onClick={e => togglePLTeams(e)}>
                <img src="https://www.premierleague.com/resources/rebrand/v7.131.3/i/elements/pl-main-logo.png" alt="PL" className="w-[15%]" />Premier League
              </button>
              <hr className="my-4 border-gray-400" />
              {showPLTeams && (
                <div className="max-h-60 overflow-y-auto">
                  {plTeams &&
                    plTeams.map((team) => (
                      <label
                        key={team.id}
                        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-700 transition duration-300"
                      >
                        <div className='flex gap-[5px]'>
                          <input
                            type="checkbox"
                            name={team.name}
                            id=""
                            value={team.name}
                            defaultChecked={checkIfChecked(team.name)}
                            onChange={handleChange}
                          />
                          <p className="text-white">{team.name}</p>
                        </div>
                        <img
                          src={team.image}
                          alt={team.name}
                          className="w-12 h-12 object-cover"
                        />
                      </label>
                    ))}
                </div>
              )}
              <button onClick={e => handleClick(e)}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardTeams;
