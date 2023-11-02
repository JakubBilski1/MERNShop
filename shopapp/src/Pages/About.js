import React from 'react';

function About() {
  return (
    <div className="bg-gray-800 text-white" style={{ backgroundColor: '#313131' }}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">About Shopper</h1>

        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-300">
            Shopper is your one-stop destination for high-quality shoes and NBA merchandise.
            We are passionate about providing you with the latest and greatest in footwear fashion,
            as well as official NBA gear.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Our Shoes</h2>
          <p className="text-gray-300">
            At Shopper, we understand that the right pair of shoes can make a big difference.
            That's why we offer a wide range of shoes for every occasion, from stylish sneakers
            to comfortable athletic footwear.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">NBA Merchandise</h2>
          <p className="text-gray-300">
            As avid NBA fans, we also bring you a collection of official NBA merchandise.
            Show your support for your favorite teams and players with our selection of jerseys,
            caps, and other NBA accessories.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
