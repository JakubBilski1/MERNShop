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
  const [selectedTeams, setSelectedTeams] = useState({});
  const [teamsfromDB, setTeamsfromDB] = useState([]);

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
    const image = e.target.value;
    const team = e.target.name;
    e.target.checked ? setSelectedTeams(prevState => ({...prevState, [team]: image})) : setSelectedTeams(prevState => ({...prevState, [team]: null}));
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log(selectedTeams)
    axios
      .post('http://localhost:5000/u/updateData', { selectedTeams: selectedTeams }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
      setPopupVisible(false);
  };
  

  const checkIfChecked = (team) => {
    if(teamsfromDB){
      if(teamsfromDB[team]){
        return true;
      }
    }
    return false;
  };

  return (
    <div className="bg-gray-800 p-8 rounded shadow-lg w-96 relative flex justify-around">
      <button
        className="bg-gray-600 rounded-full p-4 text-white focus:outline-none"
        onClick={togglePopup}
      >
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
      </button>
      <div>
        {teamsfromDB ? (
          <div>
            <div className="flex gap-2">
              {Object.entries(teamsfromDB).map(([key, value]) => {
                return (
                  value!==null &&
                  (<div key={key} className="flex items-center gap-2">
                  <img
                    src={value}
                    alt={key}
                    className="w-12 h-12 object-cover"
                  />
                </div>)
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-white text-lg font-bold mt-4">
            Nie wybrałeś jeszcze ulubionych drużyn
          </p>
        )}
      </div>

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
                            value={team.image}
                            defaultChecked={checkIfChecked(team.team_name)}
                            onChange={e=>handleChange(e)}
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
                            value={team.image}
                            defaultChecked={checkIfChecked(team.name)}
                            onChange={e=>handleChange(e)}
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
