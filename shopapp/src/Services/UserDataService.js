import axios from "axios";

const getUser = async () => {
    const response = await axios.post('http://localhost:5000/u/dashboard', {}, { withCredentials: true }) 
    return response.data
}

const logout = () => {
    axios.post('http://localhost:5000/u/logout', {}, { withCredentials: true })
      .then((res) => (window.location.href = res.data.redirectTo))
      .catch((err) => console.log(err));
};

const getNBATeams = async () => {
    const response = await axios.post('http://localhost:5000/d/nba', {}, { withCredentials: true })
    return response.data
}

const selectTeams = async (selectedTeams) => {
    const response = await axios.post('http://localhost:5000/u/updateData', { selectedTeams: selectedTeams }, { withCredentials: true })
    return response.data
}

export {
    getUser,
    logout,
    getNBATeams,
    selectTeams
}