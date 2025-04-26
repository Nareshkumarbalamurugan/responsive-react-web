
import React from 'react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using ProdSeek, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not interfere with the proper working of the service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            All content on ProdSeek, including text, graphics, logos, and software,
            is the property of ProdSeek and is protected by copyright laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Product Listings</h2>
          <p className="mb-4">
            Sellers are responsible for the accuracy of their product listings.
            ProdSeek reserves the right to remove any listings that violate our policies.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
