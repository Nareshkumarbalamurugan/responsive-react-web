
import React from 'react';

const AboutPage = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">About ProdSeek</h1>
        
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4 text-gray-700">
              ProdSeek was founded in 2023 with a simple mission: to connect local farmers and food producers directly with consumers. We believe in supporting local businesses while providing customers with access to the freshest, highest-quality groceries available.
            </p>
            <p className="text-gray-700">
              What started as a small marketplace has grown into a community of over 500 sellers and thousands of satisfied customers. We're proud to offer a platform that benefits both sellers and buyers while promoting sustainable practices in food sourcing and distribution.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Our mission is to revolutionize the way people shop for groceries by:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
              <li>Supporting local farmers and producers</li>
              <li>Reducing the carbon footprint associated with long food supply chains</li>
              <li>Providing customers with fresh, high-quality products at fair prices</li>
              <li>Creating a transparent marketplace where customers know exactly where their food comes from</li>
              <li>Building a sustainable business model that benefits all stakeholders</li>
            </ul>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brandGreen text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Shop</h3>
                <p className="text-gray-600">Browse our selection of fresh products from local sellers</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brandGreen text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Order</h3>
                <p className="text-gray-600">Place your order and choose your delivery options</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-brandGreen text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Enjoy</h3>
                <p className="text-gray-600">Receive fresh products delivered to your door</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-4">Join Us</h2>
            <p className="mb-4 text-gray-700">
              Whether you're a customer looking for the freshest groceries or a producer wanting to reach more customers, we invite you to join our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a href="/register" className="bg-brandGreen text-white px-6 py-3 rounded-md text-center font-medium hover:opacity-90 transition-opacity">
                Register as a Buyer
              </a>
              <a href="/register" className="bg-[#3a5a9b] text-white px-6 py-3 rounded-md text-center font-medium hover:opacity-90 transition-opacity">
                Register as a Seller
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
