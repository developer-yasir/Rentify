import React from 'react';
import '../index.css';
import './AboutPage.css'; // Import the new CSS file

function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Rentify</h1>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>At Rentify, our mission is to revolutionize the rental experience by providing a seamless, secure, and comprehensive platform for connecting renters with owners. We strive to make renting and listing properties, vehicles, furniture, and gadgets effortless and accessible for everyone.</p>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>We envision a world where accessing temporary assets is as simple as a few clicks. Rentify aims to be the leading global platform for all rental needs, fostering a community built on trust, convenience, and efficiency.</p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>A wide variety of rental categories: Properties, Vehicles, Furniture, Gadgets, and more.</li>
          <li>Secure and transparent booking and payment processes.</li>
          <li>Easy-to-use listing tools for owners to monetize their assets.</li>
          <li>A reliable support system for all users.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Trust:</strong> Building a reliable community through transparency and security.</li>
          <li><strong>Innovation:</strong> Continuously improving our platform to meet evolving user needs.</li>
          <li><strong>Customer Focus:</strong> Prioritizing the satisfaction and success of our users.</li>
          <li><strong>Accessibility:</strong> Making rentals easy and available to everyone.</li>
        </ul>
      </section>

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          {/* Placeholder for team members - you can add actual team member cards here */}
          <div className="team-member-card">
            <img src="https://via.placeholder.com/120" alt="Team Member 1" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member-card">
            <img src="https://via.placeholder.com/120" alt="Team Member 2" />
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member-card">
            <img src="https://via.placeholder.com/120" alt="Team Member 3" />
            <h3>Emily White</h3>
            <p>Head of Operations</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
