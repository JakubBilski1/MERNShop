import React, { useState } from 'react'
import axios from 'axios'

function Dashboard() {
    const [userData, setUserData] = useState({})
    const getUserData = () =>{
      axios.post('http://localhost:5000/u/dashboard', {withCredentials: true})
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))
    }
    const logout = () => {
      axios.post('http://localhost:5000/auth/logout', {withCredentials: true})
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
    }
    getUserData()
  return (
    <div>
      <p>{userData.nick}</p>
      <p>{userData.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard
