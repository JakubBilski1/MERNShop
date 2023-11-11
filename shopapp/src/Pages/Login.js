import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Login() {
  const [info, setInfo] = useState('');
  const [data, setData] = useState({email: '', password: ''})
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', credentials, {withCredentials: true});
      if(response){
        const redirectTo = response.data.redirectTo;
        window.location.href = redirectTo;
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    login({data})
  }
  return (
    <div className="flex items-center justify-center p-[10vh]" style={{ background: 'linear-gradient(135deg, #3498db, #c0392b)'}}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96 text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-semibold">Email Address</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 py-2 border border-gray-600 rounded outline-none focus:border-blue-400 text-black"
                placeholder="Your email address"
                name="email"
                onChange={e=>handleChange(e)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 py-2 border border-gray-600 rounded outline-none focus:border-blue-400 text-black"
                placeholder="Your password"
                name="password"
                onChange={e=>handleChange(e)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition duration-300"
            onClick={e=>handleSubmit(e)}
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Don't have an account? <Link to="/register" className="text-blue-400 font-semibold hover:underline">Register</Link>
        </p>
        <p>{info}</p>
      </div>
    </div>
  );
}