import React from 'react';
import { supabase } from '../lib/supabaseClient';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-textSecondary max-w-3xl mx-auto">
            Get in touch with us for bookings, questions, or more information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-textSecondary mb-4">
              We'd love to hear from you! Whether you have questions about our services, 
              want to book a stay, or need more information about our fishing lake, 
              our team is here to help.
            </p>
            <p className="text-textSecondary mb-4">
              Our friendly staff are available to assist you with all your needs and 
              provide information about our premium fishing experience.
            </p>
            <p className="text-textSecondary">
              Please feel free to reach out to us using the contact details below or 
              through our online booking form.
            </p>
          </div>
          
          <div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Location</h3>
            <p className="text-textSecondary">
              Lake District, France
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hours</h3>
            <p className="text-textSecondary">
              24/7 Support
            </p>
          </div>

          <div className="bg-surface p-6 rounded-lg border border-border text-center">
            <div className="text-primary text-4xl mb-4">
              <span className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-bold mb-3">Email</h3>
            <p className="text-textSecondary">
              info@carpfishinglake.com
            </p>
          </div>
        </div>

        <div className="bg-surface p-8 rounded-lg border border-border mb-16">
          <h2 className="text-2xl font-bold mb-6">Contact Form</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-textSecondary mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-textSecondary mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your email"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="subject" className="block text-textSecondary mb-2">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Subject"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-textSecondary mb-2">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your message"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Visit Our Lake</h2>
          <div className="bg-surface p-8 rounded-lg border border-border max-w-3xl mx-auto">
            <p className="text-textSecondary mb-4">
              Our lake is located in the beautiful Lake District of France, 
              offering stunning scenery and excellent fishing conditions.
            </p>
            <p className="text-textSecondary">
              We're easily accessible by car and offer a range of accommodation 
              options for guests looking to enjoy our premium fishing experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
