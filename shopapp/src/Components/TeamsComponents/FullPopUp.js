import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import NBATeams from './NBATeams';
import PLTeams from './PLTeams';
import { selectTeams } from '../../Services/UserDataService';

function FullPopUp(props) {
    const toggleNBATeams = () => {
        setShowNBATeams((prevState) => !prevState);
      };
    
      const togglePLTeams = (e) => {
        e.preventDefault();
        setShowPLTeams((prevState) => !prevState);
      };
  const [showNBATeams, setShowNBATeams] = useState(false);
  const [showPLTeams, setShowPLTeams] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState({});

  const handleChange = (e) => {
    const image = e.target.value;
    const team = e.target.name;
    e.target.checked ? setSelectedTeams(prevState => ({...prevState, [team]: image})) : setSelectedTeams(prevState => ({...prevState, [team]: null}));
  }

  const handleClick = async(e) => {
    e.preventDefault();
    try{
        await selectTeams(selectedTeams);
    }catch(err){
        console.log(err);
    }
      props.setPopupVisible(false);
  };
  

  const checkIfChecked = (team) => {
    if(props.teamsfromDB){
      if(props.teamsfromDB[team]){
        return true;
      }
    }
    return false;
  };

  return (
    <>
      {props.isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-600 p-8 rounded shadow-lg relative min-h-[70vh] w-[20%]">
            <div className="relative">
              <p className="text-white text-lg font-bold mb-4">Dodaj ulubione drużyny:</p>
              <button
                className="absolute top-0 right-0 m-2 text-black"
                onClick={props.togglePopup}
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
              {showNBATeams && <NBATeams data={props.data} checkIfChecked={checkIfChecked} handleChange={handleChange} />}
              <button className='flex items-center gap-2 text-white' onClick={e => togglePLTeams(e)}>
                <img src="https://www.premierleague.com/resources/rebrand/v7.131.3/i/elements/pl-main-logo.png" alt="PL" className="w-[15%]" />Premier League
              </button>
              <hr className="my-4 border-gray-400" />
              {showPLTeams && <PLTeams checkIfChecked={checkIfChecked} handleChange={handleChange} /> }
              <button onClick={e => handleClick(e)}>Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default FullPopUp
