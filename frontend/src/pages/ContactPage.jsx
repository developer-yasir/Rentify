import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import '../index.css';
import './ContactPage.css'; // Import the new CSS file

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/contact', formData, config);
      console.log('Message sent:', data);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error.response.data.message || error.message);
      alert('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>

      <div className="contact-content">
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>
        </section>

        <section className="contact-info-section">
          <h2>Our Contact Information</h2>
          <p>We're here to help! Feel free to reach out to us through any of the following channels:</p>
          <ul>
            <li><strong>Email:</strong> support@rentify.com</li>
            <li><strong>Phone:</strong> +1 (555) 123-4567</li>
            <li><strong>Address:</strong> 123 Rental Lane, Suite 100, City, State, 12345</li>
            <li><strong>Business Hours:</strong> Mon - Fri: 9:00 AM - 5:00 PM (EST)</li>
          </ul>
          {/* You could embed a map here later */}
        </section>
      </div>

      <section className="recommended-sections">
        <h2>Recommended Sections</h2>
        <div className="recommended-grid">
          <div className="recommended-card">
            <h3>Frequently Asked Questions</h3>
            <p>Find answers to common questions about Rentify, renting, and listing items.</p>
            <a href="#" className="btn btn-secondary">View FAQ</a> {/* Link to an FAQ page/section */}
          </div>
          <div className="recommended-card">
            <h3>Community Forum</h3>
            <p>Join our community to discuss, share tips, and get support from other users.</p>
            <a href="#" className="btn btn-secondary">Visit Forum</a> {/* Link to a forum */}
          </div>
          <div className="recommended-card">
            <h3>Social Media</h3>
            <p>Follow us on social media for updates, news, and special offers.</p>
            <p>[Social Media Icons Here]</p> {/* Placeholder for social media icons */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
