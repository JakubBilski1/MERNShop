import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

function Register() {
    const [data, setData] = useState({
        nick: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.password !== data.passwordConfirm) {
            alert("Hasło i potwierdzenie hasła nie pasują do siebie.");
            return;
        }
        console.log(data)
    }
  return (
    <div className="flex items-center justify-center flex-grow h-full" style={{ background: 'linear-gradient(135deg, #3498db, #c0392b)'}}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96 text-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="nick" className="text-sm font-semibold">Nickname</label>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                id="nick"
                className="w-full pl-10 py-2 border border-gray-600 rounded outline-none focus:border-blue-400 text-black"
                onChange={(e) => handleChange(e)}
                placeholder="Your nickname"
                name="nick"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-sm font-semibold">Email Address</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 py-2 border border-gray-600 rounded outline-none focus:border-blue-400 text-black"
                onChange={(e) => handleChange(e)}
                placeholder="Your email address"
                name="email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 py-2 border border-gray-600 rounded outline-none focus:border-blue-400 text-black"
                onChange={(e) => handleChange(e)}
                placeholder="Your password"
                name="password"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="passwordConfirm" className="text-sm font-semibold">Confirm Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <input
                type="password"
                id="passwordConfirm"
                className="w-full pl-10 py-2 border border-gray-600 rounded outline-none focus:border-blue-400 text-black"
                onChange={(e) => handleChange(e)}
                placeholder="Confirm your password"
                name="passwordConfirm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition duration-300"
            onClick={(e) => handleSubmit(e)}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400 text-center">
          Already have an account? <Link to="/login" className="text-blue-400 font-semibold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
