import React from 'react'

function Settings() {
  return (
    <form className="mt-4">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Dark Mode
            </label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <label className="block text-gray-400 text-sm font-bold mt-2 mb-2">
              Country
            </label>
            <input
              type="text"
              className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
            />
            <label className="block text-gray-400 text-sm font-bold mt-2 mb-2">
              City
            </label>
            <input
              type="text"
              className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
            />
            <label className="block text-gray-400 text-sm font-bold mt-2 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
            />
            <label className="block text-gray-400 text-sm font-bold mt-2 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="bg-gray-700 focus:outline-none focus:shadow-outline-gray border rounded py-2 px-3"
            />
          </form>
  )
}

export default Settings
