import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../Services/LoginService';

export default function Login() {
  const [data, setData] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const response = await login({data})
      if(response === 404){
        setError('Niepoprawny email lub hasło')
      }
    }catch(error){
      console.error('Error:', error)
    }finally{
      setLoading(false)
    }
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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className={`w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? 'Loading...' : 'Log In'}
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Don't have an account? <Link to="/register" className="text-blue-400 font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}