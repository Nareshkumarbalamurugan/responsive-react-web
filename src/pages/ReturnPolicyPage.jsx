
import React from 'react';

const ReturnPolicyPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Return and Refund Policy</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Return Eligibility</h2>
          <p className="mb-4">Items must be returned within 30 days of delivery and must be:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Unused and in original packaging</li>
            <li>In the same condition as received</li>
            <li>With all tags and labels attached</li>
            <li>Accompanied by the original receipt</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Perishable goods</li>
            <li>Intimate or sanitary goods</li>
            <li>Hazardous materials</li>
            <li>Gift cards</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
          <p className="mb-4">
            Once we receive your return, we will inspect it and notify you of the approval
            or rejection of your refund. If approved, your refund will be processed within
            5-7 business days.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
