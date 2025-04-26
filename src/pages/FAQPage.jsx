
import React from 'react';

const FAQPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="space-y-6">
        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-2">How do I place an order?</h3>
          <p className="text-gray-600">
            Browse our products, add items to your cart, and proceed to checkout.
            You'll need to be logged in to complete your purchase.
          </p>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
          <p className="text-gray-600">
            We accept major credit cards, debit cards, and digital payment methods.
          </p>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-2">How can I become a seller?</h3>
          <p className="text-gray-600">
            Register for a seller account, complete the verification process,
            and start listing your products once approved.
          </p>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-2">What is your delivery timeframe?</h3>
          <p className="text-gray-600">
            Delivery times vary by location and seller. Estimated delivery times
            are shown at checkout for each product.
          </p>
        </div>

        <div className="border-b pb-6">
          <h3 className="text-xl font-semibold mb-2">How do I track my order?</h3>
          <p className="text-gray-600">
            Once your order is shipped, you'll receive a tracking number via email.
            You can also track orders from your account dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
