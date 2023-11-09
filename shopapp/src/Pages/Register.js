import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Register() {
    const [data, setData] = useState({
        nick: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailPattern.test(data.email)) {
            setError('Enter a valid email address.');
            return;
        }

        if (data.password !== data.passwordConfirm) {
            setError('Password and password confirmation do not match.');
            return;
        }

        for (const key in data) {
            if (data[key] === '') {
                setError('All fields are required.');
                return;
            }
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

        if (!passwordPattern.test(data.password)) {
            setError('Password must be at least 8 characters long and include a digit, a lowercase letter, and an uppercase letter.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await axios.post('/auth/register', { data });

            const { userData, redirectTo } = response.data;

            console.log(userData);

            window.location.href = redirectTo;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center p-[10vh]" style={{ background: 'linear-gradient(135deg, #3498db, #c0392b)' }}>
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full sm:w-96 text-white">
                <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
                <form method="POST">
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className={`w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={(e) => handleSubmit(e)}
                    >
                        {loading ? 'Loading...' : 'Register'}
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-400 text-center">
                    Already have an account? <Link to="/login" className="text-blue-400 font-semibold hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
}
