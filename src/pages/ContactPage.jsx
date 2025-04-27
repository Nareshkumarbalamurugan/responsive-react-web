
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/AuthContext';

const ContactPage = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : '',
    email: currentUser ? currentUser.email : '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      toast.success('Your message has been sent! We will get back to you soon.');
      setFormData(prev => ({
        ...prev,
        subject: '',
        message: ''
      }));
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Get In Touch</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-1">Email</p>
                    <p className="font-medium">support@grocerystore.com</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Phone</p>
                    <p className="font-medium">+91 1234567890</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Address</p>
                    <p className="font-medium">123 Main Street, Bangalore, Karnataka 560001, India</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Business Hours</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Saturday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Sunday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brandGreen text-white px-6 py-2 rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
              {/* Replace with actual Google Maps embed */}
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-500">
                  <p>Google Maps would be embedded here</p>
                  <p className="text-sm mt-2">123 Main Street, Bangalore, Karnataka 560001, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
