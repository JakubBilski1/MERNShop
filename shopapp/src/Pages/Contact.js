import React from 'react';

function Contact() {
  return (
    <div className="bg-gray-800 text-white" style={{ backgroundColor: '#313131' }}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">Contact Shopper</h1>

        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-gray-300">
            You can reach us at the following address:
          </p>
          <p className="text-gray-300">Fredry 13, ZSK</p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Form</h2>
          <form className="space-y-4">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input type="text" id="name" name="name" className="w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div className="w-1/2 px-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input type="email" id="email" name="email" className="w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
            </div>
            <div className="px-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div className="px-2">
              <button type="submit" className="bg-indigo-600 text-white rounded-md p-3 w-full">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
